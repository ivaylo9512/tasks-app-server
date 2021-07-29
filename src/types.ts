import {Request, Response} from 'express'
import TaskService from "./service/task-service-impl";
import UserService from "./service/base/user-service";
import UserEntity from './entities/user';

export type ApolloContext = {
    userService: UserService;
    taskService: TaskService
    foundUser?: UserEntity;
    jwtUser?: JwtUser;   
    req: Request,
    res: Response
}
export type JwtUser = {
    id: number,
    role: string
}
declare module 'jsonwebtoken' {
    function verify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions): JwtUser;
}