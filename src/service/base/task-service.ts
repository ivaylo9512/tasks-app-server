import { TaskInput } from '../../resolvers/types/task-input';
import { Task } from 'src/entities/task';
import { LoggedUser } from 'src/types';

export default interface TaskService {
    findById(id: number, loggedUser: LoggedUser): Promise<Task | null>;
    findByDate(date: string, loggedUser: LoggedUser): Promise<Task[]>;
    findByState(state: string, loggedUser: LoggedUser): Promise<Task[]>;
    create(taskInput: TaskInput, loggedUser: LoggedUser): Promise<Task>;
    update(taskInput: TaskInput, loggedUser: LoggedUser): Promise<Task>;
    delete(id: number, loggedUser: LoggedUser): Promise<boolean>;
}