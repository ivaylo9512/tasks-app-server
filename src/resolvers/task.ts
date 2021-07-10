import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { ApolloContext, TaskInput } from 'src/types';
import { Task } from '../entities/task';
import TaskService from 'src/service/taskServiceImpl';

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
        return TaskResolver.findTask(id);
    }

    @Mutation(() => Task)
    async createTask(
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() { em }: ApolloContext
    ): Promise<Task>{
        return TaskService.createTask(taskInput);
    }

    @Mutation(() => Task)
    async updateTask(
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() { em }: ApolloContext
    ): Promise<Task>{
        return TaskService.updateTask(taskInput);
    }

    @Mutation(() => Boolean)
    async deleteTask(
        @Arg('id') id: number,
        @Ctx() { em }: ApolloContext
    ): Promise<boolean>{
        return TaskService.delete(id)
    }
}