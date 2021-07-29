import { EntityRepository } from "@mikro-orm/mysql";
import { EntityData } from "@mikro-orm/core";
import TaskRepository from "./base/task-repository";
import { Task } from "../entities/task";

export default class TaskRepositoryImpl extends EntityRepository<Task> implements TaskRepository{
    findById(id: number, selections?: string[]){
        return this.findOneOrFail({ id }, selections);
    }

    findTask(task: EntityData<Task>){
        return this.findOne(task);
    }

    findTasks(task: EntityData<Task>){
        return this.find(task);
    }


    createTask(taskInput: EntityData<Task>){
        const task = this.create(taskInput);
        this.persist(task);
        
        return task;
    }

    delete(task: Task){
        this.remove(task);
        return true;
    }

    deleteById(id: number){
        return this.nativeDelete({ id })
    }
}