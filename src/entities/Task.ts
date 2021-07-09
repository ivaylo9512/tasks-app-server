import { Entity, PrimaryKey, Property, IdentifiedReference, ManyToOne, TimeType } from '@mikro-orm/core';
import { User } from './User';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Task {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: 'text' })
  name!: string;

  @Field(() => String)
  @Property({ type: 'date' })
  alertAt = new Date();

  @Field(() => Date)
  @Property({ type: TimeType})
  from: TimeType;

  @Field(() => Date)
  @Property({ type: TimeType})
  to: TimeType;

  @Field(() => Boolean)
  @Property({ type: 'boolean' })
  isDaily: boolean;
}