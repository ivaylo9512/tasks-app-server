import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { ApolloContext } from '../types';
import { Task } from '../entities/task';
import { TaskInput } from './types/task-input';

@Resolver()
export class TaskResolver {
    @Query(() => Task, { nullable: true })
    async getTask(
        @Arg('id') id: number,
        @Ctx() { services: { taskService } }: ApolloContext
    ): Promise<Task | null> {
        return await taskService.findById(id);
    }

    @Query(() => [Task])
    async getTasksByDate(
        @Arg('date') date: Date,
        @Ctx() { services: { taskService} } : ApolloContext
    ): Promise<Task[]> {
        return await taskService.findByDate(date);
    }

    @Mutation(() => Task)
    async createTask(
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() { services: { taskService } }: ApolloContext
    ): Promise<Task>{
        return await taskService.create(taskInput);
    }

    @Mutation(() => Task)
    async updateTask(
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() {services: { taskService }}: ApolloContext
    ): Promise<Task>{
        return await taskService.update(taskInput);
    }

    @Mutation(() => Boolean)
    async deleteTask(
        @Arg('id') id: number,
        @Ctx() { services: { taskService } }: ApolloContext
    ): Promise<boolean>{
        return await taskService.delete(id)
    }
}