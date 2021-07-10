import { TaskInput } from "../types";
import { Task } from "../entities/task";
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import TaskService from "./base/task-service";

export default class TaskServiceImpl implements TaskService{
    em : EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    
    constructor(em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>){
        this.em = em;
    }  

    async findById(id: number): Promise<Task | null> {
        return await this.em.findOneOrFail(Task, { id });
    }
    
    async create(taskInput: TaskInput): Promise<Task> {
        const task = this.em.create(Task, taskInput);
        await this.em.persistAndFlush(task);
        return task;
    }

    async update(taskInput: TaskInput): Promise<Task> {
        const task = await this.em.findOneOrFail(Task, { id: taskInput.id });

        TaskServiceImpl.checkValues(taskInput, task);

        await this.em.persistAndFlush(task);
        return task;
    }

    async delete(id: number): Promise<boolean> {
        const task = await this.em.findOneOrFail(Task, { id });
        await this.em.removeAndFlush(task);
        
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