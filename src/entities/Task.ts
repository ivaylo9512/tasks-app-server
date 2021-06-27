import { Entity, PrimaryKey, Property, IdentifiedReference, ManyToOne } from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class Task {

  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'text' })
  name!: string;

  @Property({ type: 'date' })
  alertAt = new Date();

  @ManyToOne()
  owner!: IdentifiedReference<User>;
}