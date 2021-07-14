import { TaskInput } from '../../resolvers/types/task-input';
import { Task } from 'src/entities/task';
import Service from "./service";
import { LoggedUser } from 'src/types';

export default interface TaskService extends Service<Task>{
    create(taskInput: TaskInput): Promise<Task>;
    findByDate(date: Date): Promise<Task[]>;
    update(taskInput: TaskInput, loggedUser: LoggedUser): Promise<Task>;
    findByState(state: string): Promise<Task[]>;
}