import { Migration } from '@mikro-orm/migrations';

export class Migration20210711182522 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" add column "owner_id" int4 not null;');

    this.addSql('alter table "task" add constraint "task_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
  }

}
