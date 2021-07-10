import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { ApolloContext } from 'src/types';
import { Task } from '../entities/Task';

type TaskInput = {
    id?: number,
    from: Date,
    to: Date,
    daily: boolean,
    alertAt: Date
}
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
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() { em }: ApolloContext
    ): Promise<Task>{
        const task = em.create(Task, taskInput);
        await em.persistAndFlush(task);
        return task
    }

    @Mutation(() => Task)
    async updateTask(
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() { em }: ApolloContext
    ): Promise<Task>{
        const task = await em.findOneOrFail(Task, { id: taskInput.id });

        checkValues(taskInput, task);

        await em.persistAndFlush(task);
        return task;
    }

    @Mutation(() => Boolean)
    async deleteTask(
        @Arg('id') id: number,
        @Ctx() { em }: ApolloContext
    ): Promise<boolean>{
        await em.nativeDelete(Task, { id })
        return true;
    }
}

const checkValues = (taskInput: TaskInput, task : {[key: string]:any}) => {
    Object.entries(taskInput).forEach(([key, value]) => {
        if(typeof value !== 'undefined'){
            task[key] = value;
        }
    });
}