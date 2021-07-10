import 'reflect-metadata';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TaskResolver } from './resolvers/task';
import { ApolloContext, TaskRequest, UserRequest } from './types';
import cors from 'cors';
import TaskService from './service/task-service-impl';
import UserService from './service/user-service-impl';
import TaskRouter from './routers/task-routes';

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
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        RequestContext.create(orm.em, next);
    });
      
    app.use('/tasks', (req: TaskRequest, res, next) => {
        req.service = taskService;
        next();
    }, TaskRouter);
    
    app.use('/users', (req: UserRequest, res, next) => {
        req.service = userService;
        next();
    },);

    app.use((err, req, res, next) => {
        if(err.message.includes('not found')){
            res.status(404).send('Entity not found!');
        }else{
            err.status(500).send(err.message)
        }
      })

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TaskResolver],
            validate: false
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