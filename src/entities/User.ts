import { Entity, PrimaryKey, OneToMany, Collection, Property } from "@mikro-orm/core";
import { Task } from "./task";
import { ObjectType, Field, Int } from "type-graphql";
import UserRepositoryImpl from "../repositories/user-repository-impl";

@ObjectType()
@Entity({ customRepository: () => UserRepositoryImpl })
export default class User{
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

    @Field(() => String)
    @Property({ type: 'text' })
    role = 'user';
}