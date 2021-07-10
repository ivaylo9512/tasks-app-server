import { TaskInput } from "src/types";
import { Task } from "src/entities/task";

export default interface TaskService {
    findTask(id:number): Promise<Task | null>;
    createTask(taskInput: TaskInput): Promise<Task>;
    updateTask(taskInput: TaskInput): Promise<Task>;
    delete(id: number): Promise<boolean>;
}