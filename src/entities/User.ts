import { Entity, PrimaryKey, OneToMany, Collection, Property } from "@mikro-orm/core";
import { Task } from "./task";
import { ObjectType, Field, Int } from "type-graphql";

@Entity()
@ObjectType()
export class User{
    @Field(() => Int)
    @PrimaryKey()
    id!: Number;

    @Field(() => [Task], { nullable: true })
    @OneToMany(() => Task, t => t.owner)
    tasks? = new Collection<Task>(this);
}