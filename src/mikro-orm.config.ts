import 'reflect-metadata';
import { Task } from './entities/task';
import { MikroORM, ReflectMetadataProvider, Dictionary, IPrimaryKey } from '@mikro-orm/core'
import path from 'path';
import { User } from './entities/user';
import EntitiyNotFoundException from './exceptions/enitity-not-found';
import { NODE_ENV } from './app';

export default {
    findOneOrFailHandler: (entityName: string, _where: Dictionary | IPrimaryKey) => new EntitiyNotFoundException(`${entityName} not found!`),
    migrations: {
        path: path.join(__dirname, './migrations'), 
        pattern: /^[\w-]+\d+\.[tj]s$/,
        dropTables: process.env.NODE_ENV === 'test',
    },
    dbName: process.env.NODE_ENV === 'test' ? 'tasks-app-test' : 'tasks-app',
    entities: [Task, User],
    metadataProvider: ReflectMetadataProvider,
    user: 'postgres',
    password: '1234',
    debug: NODE_ENV !== 'production',
    type: 'postgresql'
} as Parameters<typeof MikroORM.init>[0];