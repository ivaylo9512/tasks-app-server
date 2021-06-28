import { Task } from './entities/Task';
import { MikroORM } from '@mikro-orm/core'
import path from 'path';
import { User } from './entities/User';

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), 
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: 'tasks-app2',
    entities: [Task, User],
    user: 'postgres',
    password: '1234',
    debug: process.env.NODE_ENV !== 'production',
    type: 'postgresql'
} as Parameters<typeof MikroORM.init>[0];