import { TaskInput } from '../../resolvers/types/task-input';
import { Task } from 'src/entities/task';
import Service from "./service";

export default interface TaskService extends Service<Task>{
    create(taskInput: TaskInput): Promise<Task>;
    findByDate(date: Date): Promise<Task[]>;
    update(taskInput: TaskInput): Promise<Task>;
}