import { Migration } from '@mikro-orm/migrations';

export class Migration20210628141440 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key);');

    this.addSql('create table "task" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "alert_at" timestamptz(0) not null);');
  }

}
