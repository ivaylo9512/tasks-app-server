import {Request, Response} from 'express'
import TaskService from "./service/task-service-impl";
import UserService from "./service/base/user-service";

export type ApolloContext = {
    services: {
        taskService: TaskService,
        userService: UserService
    },
    req: Request,
    res: Response
}
export interface TaskRequest extends Request {
    service?: TaskService
}
export interface UserRequest extends Request {
    service?: UserService
}