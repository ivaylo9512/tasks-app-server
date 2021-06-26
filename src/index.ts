import { MikroORM } from "@mikro-orm/core"
import { Post } from "./entities/Post";

const main = async () => {
    const orm = await MikroORM.init({
        dbName: 'tasks-app',
        entities: [Post],
        user: 'postgres',
        password: '1234',
        debug: process.env.NODE_ENV !== 'production',
        type: 'postgresql'
    });
}

main();