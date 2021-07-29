import { EntityData } from "@mikro-orm/core";
import { Task } from "../../entities/task";

export default interface TaskRepository {
    findById(id: number, selections?: string[]): Promise<Task>;
    findTask(task: EntityData<Task>): Promise<Task | null>
    findTasks(task: EntityData<Task>): Promise<Task[]>
    delete(task: Task): boolean;
    deleteById(id: number): Promise<number>;
    createTask(task: EntityData<Task>): Task;
}