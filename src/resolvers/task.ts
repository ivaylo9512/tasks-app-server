import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { ApolloContext } from 'src/types';
import { Task } from '../entities/task';

@Resolver()
export class TaskResolver {
    @Query(() => Task, { nullable: true })
    getTask(
        @Arg('id') id: number,
        @Ctx() { em }: ApolloContext
    ): Promise<Task | null>{
        return em.findOne(Task, { id })
    }

    @Mutation(() => Task)
    async createTask(
        @Arg('name') name: string,
        @Ctx() { em }: ApolloContext
    ): Promise<Task>{
        const task = em.create(Task, { name });
        await em.persistAndFlush(task);
        return task
    }

    @Mutation(() => Task)
    async updateTask(
        @Arg('id') id: number,
        @Arg('name', () => String, { nullable: true }) name: string,
        @Ctx() { em }: ApolloContext
    ): Promise<Task>{
        const task = await em.findOneOrFail(Task, { id })
        if(typeof name !== 'undefined'){
            task.name = name;
        }
        await em.persistAndFlush(task);
        return task;
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id') id: number,
        @Ctx() { em }: ApolloContext
    ): Promise<boolean>{
        await em.nativeDelete(Task, { id })
        return true;
    }
}