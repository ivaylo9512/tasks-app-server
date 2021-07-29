import { Resolver, Query, Arg, Ctx, Mutation, Int } from "type-graphql";
import { ApolloContext } from "../types";
import User from "../entities/user";
import UserInput from "./types/user-input";

@Resolver()
export default class UserResolver {
    @Query(() => User)
    async userById(
        @Arg('id', () => Int) id: number,
        @Ctx() { userService, foundUser }: ApolloContext
    ): Promise<User>{
        return await userService.findById(id, foundUser!);
    } 

    @Mutation(() => User)
    async register(
        @Ctx() { userService, jwtUser }: ApolloContext
    ): Promise<User>{
        return await userService.register(jwtUser!);
    }

    @Mutation(() => User)
    async login(
        @Ctx() { userService, jwtUser }: ApolloContext
    ): Promise<User>{
        return await userService.login(jwtUser!);
    } 

    
    @Mutation(() => [User])
    async createUsers(
        @Arg('users', () => [UserInput]) users: UserInput[],
        @Ctx() { userService, foundUser }: ApolloContext
    ): Promise<User[]>{
        return await userService.createMany(users, foundUser!);
    } 


    @Mutation(() => Boolean)
    async deleteUser(
        @Arg('id', () => Int) id: number,
        @Ctx() { userService, foundUser }: ApolloContext
    ): Promise<boolean>{
        return await userService.delete(id, foundUser!);
    } 
}