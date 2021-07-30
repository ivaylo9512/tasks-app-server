import { EntityData } from "@mikro-orm/core";
import { Task } from "../../entities/task";
import { EntityRepository } from "@mikro-orm/mysql";

export default interface TaskRepository extends EntityRepository<Task>{
    findById(id: number, selections?: string[]): Promise<Task>;
    findTask(task: EntityData<Task>): Promise<Task | null>
    findTasks(task: EntityData<Task>): Promise<Task[]>
    delete(task: Task): boolean;
    deleteById(id: number): Promise<number>;
    createTask(task: EntityData<Task>): Task;
}