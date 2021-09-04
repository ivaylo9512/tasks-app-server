import { Entity, PrimaryKey, Property, ManyToOne, DateType, TimeType } from '@mikro-orm/core';
import User  from './user-entity';
import { ObjectType, Field, Int } from 'type-graphql';
import TaskRepositoryImpl from '../repositories/task-repository-impl';

@ObjectType()
@Entity({ customRepository: () => TaskRepositoryImpl })
export default class Task {
    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    @Field(() => Date)
    @Property({ type: 'date' })
    createdAt = new Date();

    @Field(() => Date)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field()
    @Property({ type: 'text' })
    name!: string;

    @Field(() => Date, { nullable: true })
    @Property({ type: Date, length: 3, nullable: true })
    alertAt?: Date;

    @Field(() => DateType, { nullable: true })
    @Property({ type: DateType, nullable: true })
    eventDate?: Date;

    @Field(() => String, { nullable: true })
    @Property({ type: TimeType, nullable: true})
    from?: string;

    @Field(() => String, { nullable: true,  })
    @Property({ type: TimeType, nullable: true})
    to?: string;

    @Field(() => String)
    @Property({ type: 'text' })
    state!: string;

    @ManyToOne({ entity: () => User })
    @Field(() => User)
    owner!: User;
}