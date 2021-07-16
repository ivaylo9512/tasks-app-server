import {Request, Response} from 'express'
import TaskService from "./service/task-service-impl";
import UserService from "./service/base/user-service";
import { UserInput } from './resolvers/types/user-input';

export type ApolloContext = {
    services: {
        taskService: TaskService,
        userService: UserService
    },
    req: Request,
    res: Response
}
export type LoggedUser = {
    id: number,
    role: string
}
export interface TaskRequest extends Request {
    service?: TaskService
}
export interface UserRequest extends Request {
    service?: UserService
    body: UserInput
}
declare global {
    namespace Express {
      interface User extends LoggedUser{
      }
    }
}
declare module 'jsonwebtoken' {
    function verify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions): LoggedUser;
}