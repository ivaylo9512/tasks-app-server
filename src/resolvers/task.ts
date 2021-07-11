import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { ApolloContext } from '../types';
import { Task } from '../entities/task';
import { TaskInput } from './types/task-input';

@Resolver()
export class TaskResolver {
    @Query(() => Task, { nullable: true })
    getTask(
        @Arg('id') id: number,
        @Ctx() { services: { taskService } }: ApolloContext
    ): Promise<Task | null>{
        return taskService.findById(id);
    }

    @Mutation(() => Task)
    async createTask(
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() { services: { taskService } }: ApolloContext
    ): Promise<Task>{
        return taskService.create(taskInput);
    }

    @Mutation(() => Task)
    async updateTask(
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() {services: { taskService }}: ApolloContext
    ): Promise<Task>{
        return taskService.update(taskInput);
    }

    @Mutation(() => Boolean)
    async deleteTask(
        @Arg('id') id: number,
        @Ctx() { services: { taskService } }: ApolloContext
    ): Promise<boolean>{
        return taskService.delete(id)
    }
}