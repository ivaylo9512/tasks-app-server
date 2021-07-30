import TaskInput from '../../resolvers/types/task-input';
import { Task } from '../../entities/task';
import User from '../../entities/user';
import UpdateInput from '../../resolvers/types/update-input';

export default interface TaskService {
    findById(id: number, loggedUser: User): Promise<Task | null>;
    findByDate(date: string, loggedUser: User): Promise<Task[]>;
    findByState(state: string, loggedUser: User): Promise<Task[]>;
    create(taskInput: TaskInput, loggedUser: User): Promise<Task>;
    createMany(taskInput: TaskInput[], loggedUser: User): Promise<Task[]>;
    update(taskInput: UpdateInput, loggedUser: User): Promise<Task>;
    delete(id: number, loggedUser: User): Promise<boolean>;
}