import { Entity, PrimaryKey, Property, ManyToOne, TimeType } from '@mikro-orm/core';
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

  @Field(() => Date)
  @Property({ type: 'date', nullable: true })
  alertAt?: Date;

  @Field(() => Date)
  @Property({ type: 'date', nullable: true })
  eventDate?: Date;

  @Field(() => Date)
  @Property({ type: TimeType})
  from: TimeType;

  @Field(() => Date)
  @Property({ type: TimeType})
  to: TimeType;

  @Field(() => String)
  @Property({ type: 'text' })
  state: string;

  @ManyToOne({ entity: () => User })
  @Field(() => User)
  owner!: User;
}