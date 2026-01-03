<script lang="ts">
	import { api } from '../convex/_generated/api.js';
	import { useQuery, useConvexClient } from 'convex-svelte';
	import type { Id } from '../convex/_generated/dataModel';

	const tasksQuery = useQuery(api.tasks.get, () => ({}));
	const client = useConvexClient();

	async function toggle(id: Id<'tasks'>) {
		await client.mutation(api.tasks.updateTask, { id });
	}
	$inspect(tasksQuery.data);
</script>

{#if tasksQuery.isLoading}
	Loading...
{:else if tasksQuery.error}
	failed to load: {tasksQuery.error.toString()}
{:else}
	<ul>
		{#each tasksQuery.data as task (task._id)}
			<li>
				<label>
					<input type="checkbox" checked={task.isCompleted} onchange={() => toggle(task._id)} />
					<span>{task.text}</span>
				</label>
				<span>assigned by {task.assigner}</span>
			</li>
		{/each}
	</ul>
{/if}
