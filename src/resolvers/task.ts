import { Resolver, Query, Ctx, Arg, Int, Mutation } from 'type-graphql';
import { Context } from 'src/types';
import { Task } from '../entities/task';

@Resolver()
export class TaskResolver {
    @Query(() => Task, { nullable: true })
    getTask(
        @Arg('id') id: number,
        @Ctx() { em }: Context
    ): Promise<Task | null>{
        return em.findOne(Task, { id })
    }

    @Mutation(() => Task)
    async createTask(
        @Arg('name') name: string,
        @Ctx() { em }: Context
    ): Promise<Task>{
        const task = em.create(Task, { name });
        await em.persistAndFlush(task);
        return task
    }

    @Mutation(() => Task)
    async updateTask(
        @Arg('id') id: number,
        @Arg('name', () => String, { nullable: true }) name: string,
        @Ctx() { em }: Context
    ): Promise<Task>{
        const task = await em.findOne(Task. { id })
        if(!task){
            throw new Error('No title with id:' + id);
        }
        if(typeof name !== 'undefined'){
            task.name = name;
        }
        await em.persistAndFlush(task);
        return task;
    }
}