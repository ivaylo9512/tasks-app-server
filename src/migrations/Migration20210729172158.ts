import { Migration } from '@mikro-orm/migrations';

export class Migration20210729172158 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "role" text not null);');

    this.addSql('create table "task" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "alert_at" timestamptz(3) null, "event_date" date null, "from" time(0) null, "to" time(0) null, "state" text not null, "owner_id" int4 not null);');

    this.addSql('alter table "task" add constraint "task_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
  }

}
