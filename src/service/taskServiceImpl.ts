import { TaskInput } from "src/types";
import { Task } from "src/entities/task";
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import TaskService from "./base/taskService";

export default class TaskServiceImpl implements TaskService{
    em : EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    
    constructor(em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>){
        this.em = em;
    }  

    async findTask(id: number): Promise<Task | null> {
        return await this.em.findOne(Task, { id });
    }
    
    async createTask(taskInput: TaskInput): Promise<Task> {
        const task = this.em.create(Task, taskInput);
        await this.em.persistAndFlush(task);
        return task;
    }

    async updateTask(taskInput: TaskInput): Promise<Task> {
        const task = await this.em.findOneOrFail(Task, { id: taskInput.id });

        TaskServiceImpl.checkValues(taskInput, task);

        await this.em.persistAndFlush(task);
        return task;
    }

    async delete(id: number): Promise<boolean> {
        await this.em.nativeDelete(Task, { id })
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