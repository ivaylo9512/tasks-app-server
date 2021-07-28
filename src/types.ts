import {Request, Response} from 'express'
import TaskService from "./service/task-service-impl";
import UserService from "./service/base/user-service";
import UserEntity from './entities/user';

export type ApolloContext = {
    userService: UserService;
    taskService: TaskService
    foundUser?: UserEntity;   
    req: Request,
    res: Response
}
declare module 'jsonwebtoken' {
    function verify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions): LoggedUser;
}