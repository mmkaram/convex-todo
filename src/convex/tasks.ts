import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
	args: {},
	handler: async (ctx) => {
		const tasks = await ctx.db.query('tasks').collect();
		return tasks.map((task) => ({ ...task, assigner: 'mmkaram' }));
	}
});

export const updateTask = mutation({
	args: { id: v.id('tasks') },
	handler: async (ctx, args) => {
		const task = await ctx.db.get(args.id);
		if (!task) {
			throw new Error('Task not found');
		}

		await ctx.db.patch(args.id, {
			isCompleted: !task.isCompleted
		});
	}
});
