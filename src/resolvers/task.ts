import { Resolver, Query, Ctx, Arg, Mutation, Int } from 'type-graphql';
import { ApolloContext } from '../types';
import Task from '../entities/task-entity';
import TaskInput from './types/task-input';
import UpdateInput from './types/update-input';

@Resolver()
export default class TaskResolver {
    @Query(() => Task, { nullable: true })
    async taskById(
        @Arg('id', () => Int) id: number,
        @Ctx() { taskService, foundUser }: ApolloContext
    ): Promise<Task | null> {
        return await taskService.findById(id, foundUser!);
    }

    @Query(() => [Task])
    async tasksByDate(
        @Arg('date') date: string,
        @Ctx() { taskService, foundUser }: ApolloContext
    ): Promise<Task[]> {
        return await taskService.findByDate(date, foundUser!);
    }

    @Query(() => [Task])
    async tasksByState(
        @Arg('state') state: string,
        @Ctx() {taskService, foundUser}: ApolloContext
    ): Promise<Task[]>{
        return await taskService.findByState(state, foundUser!);
    }

    @Mutation(() => Task)
    async createTask(
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() { taskService, foundUser }: ApolloContext
    ): Promise<Task>{
        return await taskService.create(taskInput, foundUser!);
    }

    @Mutation(() => [Task])
    async createTasks(
        @Arg('taskInputs', () => [TaskInput]) taskInputs: TaskInput[],
        @Ctx() { taskService, foundUser }: ApolloContext
    ): Promise<Task[]>{
        return await taskService.createMany(taskInputs, foundUser!);
    }

    @Mutation(() => Task)
    async updateTask(
        @Arg('updateInput') updateInput: UpdateInput,
        @Ctx() { taskService, foundUser }: ApolloContext
    ): Promise<Task>{
        return await taskService.update(updateInput, foundUser!);
    }

    @Mutation(() => Boolean)
    async deleteTask(
        @Arg('id', () => Int) id: number,
        @Ctx() { taskService, foundUser }: ApolloContext
    ): Promise<boolean>{
        return await taskService.delete(id, foundUser!)
    }
}