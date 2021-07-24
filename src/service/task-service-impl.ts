import { TaskInput } from "../resolvers/types/task-input";
import { Task } from "../entities/task";
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import TaskService from "./base/task-service";
import { LoggedUser } from "src/types";
import UnauthorizedException from "../exceptions/unauthorized";
import { User } from "../entities/user";

export default class TaskServiceImpl implements TaskService{
    em : EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    
    constructor(em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>){
        this.em = em;
    }  

    async findById(id: number, loggedUser: LoggedUser): Promise<Task | null> {
        const task = await this.em.findOneOrFail(Task, { id }, ['owner']);
        
        if(task.owner.id != loggedUser.id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized');
        }

        return task;
    }
    
    async findByDate(date: string, loggedUser: LoggedUser): Promise<Task[]> {
        return await this.em.find(Task, { eventDate: new Date(date), owner: loggedUser.id });
    }

    async findByState(state: string, loggedUser: LoggedUser): Promise<Task[]>{
        return await this.em.find(Task, { state, owner: loggedUser.id});
    }

    async create(taskInput: TaskInput, loggedUser: LoggedUser): Promise<Task> {
        const task = this.em.create(Task, taskInput);

        const user = this.em.getReference(User, loggedUser.id);
        task.owner = user;
        
        await this.em.persist(task).flush();
        
        return task;
    }

    async update(taskInput: TaskInput, loggedUser: LoggedUser): Promise<Task> {
        const task = await this.em.findOneOrFail(Task, { id: taskInput.id }, ['owner']);
        
        if(task.owner.id != loggedUser.id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized');
        }

        TaskServiceImpl.updateFields(taskInput, task);

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

    static updateFields(taskInput: TaskInput, task : {[key: string]:any}){
        Object.entries(taskInput).forEach(([key, value]) => {
            if(typeof value !== 'undefined'){
                task[key] = value;
            }
        });
    }
}