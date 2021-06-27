import { Task } from './entities/Task';
import { MikroORM } from '@mikro-orm/core'

export default {
    dbName: 'tasks-app',
    entities: [Task],
    user: 'postgres',
    password: '1234',
    debug: process.env.NODE_ENV !== 'production',
    type: 'postgresql'
} as Parameters<typeof MikroORM.init>[0];