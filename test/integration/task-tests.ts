import { app } from "./sequential.test"
import request from "supertest"
import TaskInput from "../../src/resolvers/types/task-input"
import { secondToken, admintToken, thirdToken } from "./user-tests";

interface Task extends TaskInput {
    id?: number,
    owner?: number
}

const states = ['daily', 'event', 'goals'];
const date = new Date();
const dateString = date.toISOString().split('T')[0];
const getRandomTime = () => new Date(date.getTime() + 1000 * 60 * 60 * (Math.random() * 24))
const getRandomTimeString = () => getRandomTime().toTimeString().split(' ')[0];

const [firstTask, secondTask, thirdTask, forthTask, ...tasks]: Task[] = Array.from({length: 16}).map((_task, i) => ({
    name: 'name' + i,
    state: states[i % 3],
    eventDate: dateString,
    from: getRandomTimeString(),
    to: getRandomTimeString(),
    alertAt: new Date().toISOString()
}));

const [updatedFirstTask, updatedSecondTask, updatedThirdTask, updatedForthTask]: Task[] = Array.from({length: 4}).map((_task, i) => ({
    id: i + 1,
    name: 'nameUpdated' + i,
    state: states[Math.floor(i % 3 * Math.random())],
    eventDate: dateString,
    from: getRandomTimeString(),
    to: getRandomTimeString(),
    alertAt: getRandomTime().toISOString()
}));


const createTaskMutation = (taskInput: Task) => ({
    query: `mutation createTask($taskInput: TaskInput!){
        createTask(taskInput: $taskInput){
            id,
            name,
            state,
            eventDate,
            from,
            to,
            alertAt
        }   
    }`,
    operationName: 'createTask',
    variables: {
        taskInput
    }
});

const createManyTasksMutation = (taskInputs: Task[]) => ({
    query: `mutation createTasks($taskInputs: [TaskInput!]!){
        createTasks(taskInputs: $taskInputs){
            id,
            name,
            state,
            eventDate,
            from,
            to,
            alertAt
        }   
    }`,
    operationName: 'createTasks',
    variables: {
        taskInputs
    }
});

const createTaskByIdQuery = (id: number) => ({
    query: `query taskById($id: Int!){
        taskById(id: $id){
            id,
            name,
            state,
            eventDate,
            from,
            to,
            alertAt
        }   
    }`,
    operationName: 'taskById',
    variables: {
        id
    }
});

const taskTests = () => {
    it('should create task', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', secondToken)
            .send(createTaskMutation(firstTask));

        const task = res.body.data.createTask;
        firstTask.id = task.id;

        expect(task.id).toEqual(1);
        expect(task).toEqual(firstTask);
    })

    it('should create tasks when user is admin ', async() => {
        const tasksArray = [secondTask, thirdTask, forthTask, ...tasks];
        const taskInputs = tasksArray.map(task => ({...task, owner: 2}));

        const res = await request(app)
            .post('/graphql')
            .set('Authorization', admintToken)
            .send(createManyTasksMutation(taskInputs));

        const resTasks = res.body.data.createTasks;

        const ids = tasksArray.map((task, i) => task.id = resTasks[i].id);
        const expectedIds = Array.from({length: tasksArray.length}, (_v, i) => i + 2);

        expect(ids).toEqual(expectedIds);
        expect(res.body.data.createTasks).toEqual(tasksArray);
    })

    it('should return error when creating tasks with nonexistent owner', async() => {
        const taskInputs = [secondTask, thirdTask, forthTask].map(task => ({...task, owner: 15, id: undefined}));
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', admintToken)
            .send(createManyTasksMutation(taskInputs));

        expect(res.body.errors[0].message).toBe(`User with id: 15 doesn't exist.`);
    })

    it('should return Unauthorized when creating tasks with user that is not admin', async() => {
        const taskInputs = [secondTask, thirdTask, forthTask, ...tasks].map(task => ({...task, owner: 3, id: undefined}));
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', secondToken)
            .send(createManyTasksMutation(taskInputs));

        expect(res.body.errors[0].message).toBe('Unauthorized.');
    })

    it('should return task when taskById', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', secondToken)
            .send(createTaskByIdQuery(1));

        expect(res.body.data.taskById).toEqual(firstTask);
    })

    it('should return Unauthorized task when taskById with different logged user id that is not admin', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', thirdToken)
            .send(createTaskByIdQuery(1));
            
        expect(res.body.errors[0].message).toBe('Unauthorized.');
    })

    it('should return task when taskById with user with different logged user id that is admin', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', admintToken)
            .send(createTaskByIdQuery(1));
            
        expect(res.body.data.taskById).toEqual(firstTask);
    })
}

export default taskTests