import { initialize } from '../../src/app';
import userTests from './user-tests';
import { Express } from 'express';
import { MikroORM } from '@mikro-orm/core';
import taskTests from './task-tests';

export let app: Express, orm: MikroORM
describe('tests', () => {
    beforeAll(async() => {
        ({app, orm } = await initialize());
    })
    
    describe('user-tests', userTests)
    describe('tasks-tests', taskTests)

    afterAll(async() => {
        orm.close();
    })
})