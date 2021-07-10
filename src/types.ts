import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import {Request, Response} from 'express'
import TaskService from "./service/task-service-impl";
import UserService from "./service/base/user-service";
export type ApolloContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>,
    req: Request,
    res: Response
}
export type TaskInput = {
    id?: number,
    from: Date,
    to: Date,
    daily: boolean,
    alertAt: Date
}
export interface TaskRequest extends Request {
    service?: TaskService
}
export interface UserRequest extends Request {
    service?: UserService
}