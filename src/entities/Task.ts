import { Entity, PrimaryKey, Property, ManyToOne, DateType } from '@mikro-orm/core';
import { User } from './user';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Task {
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
  @Property({ type: 'date', nullable: true })
  alertAt?: Date;

  @Field(() => DateType, { nullable: true })
  @Property({ type: DateType, nullable: true })
  eventDate?: Date;

  @Field(() => String, { nullable: true })
  @Property({ type: 'timeType', nullable: true})
  from?: Date;

  @Field(() => String, { nullable: true })
  @Property({ type: 'timeType', nullable: true})
  to?: Date;

  @Field(() => String)
  @Property({ type: 'text' })
  state!: string;

  @ManyToOne({ entity: () => User })
  @Field(() => User)
  owner!: User;
}