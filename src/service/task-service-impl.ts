import { TaskInput } from "../resolvers/types/task-input";
import { Task } from "../entities/task";
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import TaskService from "./base/task-service";
import { LoggedUser } from "src/types";
import UnauthorizedException from "src/errors/unauthorized";

export default class TaskServiceImpl implements TaskService{
    em : EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    
    constructor(em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>){
        this.em = em;
    }  

    async findById(id: number): Promise<Task | null> {
        return await this.em.findOneOrFail(Task, { id });
    }
    
    async findByDate(date: Date): Promise<Task[]> {
        return await this.em.find(Task, { eventDate: date });
    }

    async findByState(state: string): Promise<Task[]>{
        return await this.em.find(Task, {state});
    }

    async create(taskInput: TaskInput): Promise<Task> {
        const task = this.em.create(Task, taskInput);
        await this.em.persist(task);
        return task;
    }

    async update(taskInput: TaskInput, loggedUser: LoggedUser): Promise<Task> {
        const task = await this.em.findOneOrFail(Task, { id: taskInput.id }, ['owner']);
        
        if(task.owner.id != loggedUser.id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized');
        }

        TaskServiceImpl.checkValues(taskInput, task);

        await this.em.flush();
        return task;
    }

    async delete(id: number, loggedUser: LoggedUser): Promise<boolean> {
        const task = await this.em.findOneOrFail(Task, { id }, ['owner']);
        
        if(task.owner.id != loggedUser.id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized');
        }
        
        await this.em.remove(task);
        
        return true;
    }

    static checkValues(taskInput: TaskInput, task : {[key: string]:any}){
        Object.entries(taskInput).forEach(([key, value]) => {
            if(typeof value !== 'undefined'){
                task[key] = value;
            }
        });
    }
}