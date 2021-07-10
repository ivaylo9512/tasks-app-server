import {Request, Response} from 'express'
import TaskService from "./service/task-service-impl";
import UserService from "./service/base/user-service";
import { InputType, Field } from 'type-graphql';

export type ApolloContext = {
    services: {
        taskService: TaskService,
        userService: UserService
    },
    req: Request,
    res: Response
}
@InputType()
export class TaskInput {
    @Field()
    id?: number
    @Field()
    from: Date
    @Field()
    to: Date
    @Field()
    daily: boolean
    @Field()
    alertAt: Date
}
export interface TaskRequest extends Request {
    service?: TaskService
}
export interface UserRequest extends Request {
    service?: UserService
}