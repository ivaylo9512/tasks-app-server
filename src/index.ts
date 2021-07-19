import './utils/load-env'
import 'reflect-metadata';
import { MikroORM, RequestContext, DateType } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TaskResolver } from './resolvers/task';
import { ApolloContext, TaskRequest, UserRequest } from './types';
import cors from 'cors';
import TaskService from './service/task-service-impl';
import UserService from './service/user-service-impl';
import taskRouter from './routers/task-routes';
import userRouter from './routers/user-routes';
import './utils/authenticate'
import { DateTypeScalar } from './scalars/date-time';
import multer from 'multer';

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    const taskService = new TaskService(orm.em);
    const userService = new UserService(orm.em);

    const app = express();
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    multer({ dest: 'src/public' })
    app.use(express.static('src/public'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        RequestContext.create(orm.em, next);
    });
      
    app.use('/tasks', (req: TaskRequest, res, next) => {
        req.service = taskService;
        next();
    }, taskRouter);
    
    app.use('/users', (req: UserRequest, res, next) => {
        req.service = userService;
        next();
    },userRouter);

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TaskResolver],
            validate: false,
            scalarsMap: [{ type: DateType, scalar: DateTypeScalar }],
        }),
        context: ({req, res}): ApolloContext => ({ 
            services: {
                userService, 
                taskService
            }, 
            req, 
            res
        })
    });

    apolloServer.applyMiddleware({ app })

    const port = process.env.PORT || 8099;
    app.listen(port, () =>{
        console.log(`\n🚀!! server started on http://localhost:${port} !!`)
    })
}

main().catch(err => console.log(err));