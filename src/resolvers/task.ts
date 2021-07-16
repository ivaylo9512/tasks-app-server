import { Resolver, Query, Ctx, Arg, Mutation, Int } from 'type-graphql';
import { ApolloContext } from '../types';
import { Task } from '../entities/task';
import { TaskInput } from './types/task-input';
import UnauthorizedException from '../exceptions/unauthorized';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '../utils/jwt-strategy';

@Resolver()
export class TaskResolver {
    @Query(() => Task, { nullable: true })
    async taskById(
        @Arg('id', () => Int) id: number,
        @Ctx() { services: { taskService }, req }: ApolloContext
    ): Promise<Task | null> {
        const loggedUser = TaskResolver.getUserFromToken(req.headers?.authorization);
    
        return await taskService.findById(id, loggedUser);
    }

    @Query(() => [Task])
    async tasksByDate(
        @Arg('date') date: string,
        @Ctx() { services: { taskService }, req}: ApolloContext
    ): Promise<Task[]> {
        const loggedUser = TaskResolver.getUserFromToken(req.headers?.authorization);

        return await taskService.findByDate(date, loggedUser);
    }

    @Query(() => [Task])
    async getTasksByState(
        @Arg('state') state: string,
        @Ctx() {services: { taskService }, req}: ApolloContext
    ): Promise<Task[]>{
        const loggedUser = TaskResolver.getUserFromToken(req.headers?.authorization);

        return await taskService.findByState(state, loggedUser);
    }

    @Mutation(() => Task)
    async createTask(
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() { services: { taskService }, req }: ApolloContext
    ): Promise<Task>{
        const loggedUser = TaskResolver.getUserFromToken(req.headers?.authorization);

        return await taskService.create(taskInput, loggedUser);
    }

    @Mutation(() => Task)
    async updateTask(
        @Arg('taskInput') taskInput: TaskInput,
        @Ctx() {services: { taskService }, req}: ApolloContext
    ): Promise<Task>{
        const loggedUser = TaskResolver.getUserFromToken(req.headers?.authorization);

        return await taskService.update(taskInput, loggedUser);
    }

    @Mutation(() => Boolean)
    async deleteTask(
        @Arg('id') id: number,
        @Ctx() { services: { taskService }, req }: ApolloContext
    ): Promise<boolean>{
        const loggedUser = TaskResolver.getUserFromToken(req.headers?.authorization);

        return await taskService.delete(id, loggedUser)
    }

    static getUserFromToken(token?: string) {
        if(!token){
            throw new UnauthorizedException('Unauthorized');
        }
        token = token.split(' ')[1];
    
        const loggedUser = verify(token, jwtSecret);
        if(!loggedUser){
            throw new UnauthorizedException('Unauthorized')
        }

        return loggedUser;
    }
}