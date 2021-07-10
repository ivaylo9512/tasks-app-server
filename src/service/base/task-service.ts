import { TaskInput } from "src/types";
import { Task } from "src/entities/task";
import Service from "./service";

export default interface TaskService extends Service<Task>{
    create(taskInput: TaskInput): Promise<Task>;
    update(taskInput: TaskInput): Promise<Task>;
}