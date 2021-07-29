import './utils/load-env'
import 'reflect-metadata';
import './utils/jwt'
import { MikroORM, RequestContext, DateType } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import TaskResolver from './resolvers/task';
import UserResolver from './resolvers/user';
import { ApolloContext } from './types';
import cors from 'cors';
import TaskService from './service/task-service-impl';
import UserService from './service/user-service-impl';
import { DateTypeScalar } from './scalars/date-time';
import multer from 'multer';
import { Task } from './entities/task';
import User from './entities/user';
import { applyMiddleware } from 'graphql-middleware';
import authMiddleware from './resolvers/middlewares/auth';

export const NODE_ENV = process.env.NODE_ENV
export const initialize = async () => {
    const orm = await MikroORM.init(mikroConfig);
    
    if(NODE_ENV === 'test'){
        await orm.getSchemaGenerator().dropSchema(undefined, true);
    }
    await orm.getMigrator().up();

    const taskService = new TaskService(orm.em.getRepository(Task));
    const userService = new UserService(orm.em.getRepository(User));

    const app = express();

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    multer({ dest: 'src/public' })
    app.use(express.static('src/public'));

    app.use((_req, _res, next) => {
        RequestContext.create(orm.em, next);
    });
      
    const apolloServer = new ApolloServer({
        schema: applyMiddleware(await buildSchema({
            resolvers: [TaskResolver, UserResolver],
            validate: false,
            scalarsMap: [{ type: DateType, scalar: DateTypeScalar }],
        }), authMiddleware),
        context: ({req, res}): ApolloContext => ({ 
            userService, 
            taskService,
            req, 
            res
        })
    });

    apolloServer.applyMiddleware({ app })

    return {
        app,
        orm
    };
}