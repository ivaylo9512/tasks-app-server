import { Migration } from '@mikro-orm/migrations';

export class Migration20210710191228 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" drop constraint if exists "task_alert_at_check";');
    this.addSql('alter table "task" alter column "alert_at" type timestamptz(0) using ("alert_at"::timestamptz(0));');
    this.addSql('alter table "task" alter column "alert_at" drop not null;');
  }

}
