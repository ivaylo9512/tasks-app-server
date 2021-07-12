import { Migration } from '@mikro-orm/migrations';

export class Migration20210712205116 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null;');

    this.addSql('alter table "task" add column "event_date" timestamptz(0) null, add column "state" text not null;');
    this.addSql('alter table "task" drop column "is_daily";');
  }

}
