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

    @Field(() => Date)
    @Property({ type: 'date' })
    createdAt = new Date();
  
    @Field(() => Date)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();
}