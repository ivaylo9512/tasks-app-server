import { Migration } from '@mikro-orm/migrations';

export class Migration20210716200732 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" drop constraint if exists "task_from_check";');
    this.addSql('alter table "task" alter column "from" type time(0) using ("from"::time(0));');
    this.addSql('alter table "task" alter column "from" drop not null;');
    this.addSql('alter table "task" drop constraint if exists "task_to_check";');
    this.addSql('alter table "task" alter column "to" type time(0) using ("to"::time(0));');
    this.addSql('alter table "task" alter column "to" drop not null;');
  }

}
