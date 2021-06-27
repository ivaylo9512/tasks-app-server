import { Entity, PrimaryKey, OneToMany, Collection } from "@mikro-orm/core";
import { Task } from "./Task";

@Entity()
export class User{
    @PrimaryKey()
    id!: Number

    @OneToMany(() => Task, task => task.owner)
    tasks = new Collection<Task>(this);
    
}