import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { TaskInput } from "src/types";
import { Task } from "src/entities/task";

export default interface TaskService {
    new (em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>): TaskService;
    findTask(id:number): Promise<Task>;
    createTask(taskInput: TaskInput): Promise<Task>;
    updateTask(taskInput: TaskInput): Promise<Task>;
    delete(id: number): boolean;
}