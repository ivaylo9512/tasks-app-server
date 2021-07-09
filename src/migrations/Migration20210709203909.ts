import { Migration } from '@mikro-orm/migrations';

export class Migration20210709203909 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "task" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "alert_at" timestamptz(0) not null, "from" time(0) not null, "to" time(0) not null, "is_daily" bool not null);');
  }

}
