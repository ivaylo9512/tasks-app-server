import { MikroORM } from "@mikro-orm/core"

const main = async () => {
    const orm = await MikroORM.init({
        dbName: 'tasks-app',
        entities: [],
        user: 'postgres',
        password: '1234',
        debug: process.env.NODE_ENV !== 'production',
        type: 'postgresql'
    });
}

main();