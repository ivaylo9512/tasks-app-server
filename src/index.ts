import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TaskResolver } from './resolvers/task';
import { ApolloContext } from './types';
import cors from 'cors';

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    const app = express();
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TaskResolver],
            validate: false
        }),
        context: ({req, res}): ApolloContext => ({ em: orm.em, req, res })
    });

    apolloServer.applyMiddleware({ app })

    const port = process.env.PORT || 8099;
    app.listen(port, () =>{
        console.log(`\n🚀!! server started on http://localhost:${port} !!`)
    })
}

main().catch(err => console.log(err));