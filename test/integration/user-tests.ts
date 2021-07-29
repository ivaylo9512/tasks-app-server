import request from 'supertest';
import { getToken } from '../../src/utils/jwt';
import { app } from './sequential.test';
import UserInput from '../../src/resolvers/types/user-input';


const [secondUser, thirdUser, forthUser, fifthUser]: UserInput[] = Array.from({length: 4}).map((_user, i) => ({
    id: i + 2,
    role: 'user'
}))
const admintUser = {
    id: 1,
    role: 'admin'
}
const admintToken = 'Bearer ' + getToken(admintUser)
const secondToken = 'Bearer ' + getToken(secondUser)
const thirdToken = 'Bearer ' + getToken(thirdUser)
const forthToken = 'Bearer ' + getToken(forthUser)

let createManyMutation = (users: UserInput[]) => ({
    query: `mutation createManyUsers($users: [UserInput!]!){
        createManyUsers(users: $users){
            id,
            role
        }
    }`,
    operationName: 'createManyUsers',
    variables: {
        users
    }
});

let createDeleteMutation = (id: number) => ({
    query: `mutation deleteUser($id: Int!){
        deleteUser(id: $id)
    }`,
    operationName: 'deleteUser',
    variables: {
        id
    }
});

let registerMutation = {
    query: `mutation register{
            register{
                id,
                role
            }
    }`,
    operationName: 'register',
};

let loginMutation = {
    query: `mutation login{
            login{
                id,
                role
            }
    }`,
    operationName: 'login',
};

const userTests = () => {
    it('should register user with token from auth server', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', admintToken)
            .send(registerMutation);

        expect(res.body.data.register).toEqual(admintUser);
    })

    it('should loging with token from auth server when user is present', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', admintToken)
            .send(loginMutation);

        expect(res.body.data.login).toEqual(admintUser);
    })
    
    it('should register when loging with token from auth server when user is not present', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', secondToken)
            .send(loginMutation);

        expect(res.body.data.login).toEqual(secondUser);
    })

    it('should return error when register from token with user that already exists', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', secondToken)
            .send(registerMutation);

        expect(res.body.errors[0].message).toBe('User with id: 2 already exists.');
    })

    it('should create users when user from token is admin', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', admintToken)
            .send(createManyMutation([thirdUser, forthUser, fifthUser]));
            
        expect(res.body.data.createManyUsers).toEqual([thirdUser, forthUser, fifthUser]);
    })

    it('should return error when creating user when user already exists', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', admintToken)
            .send(createManyMutation([thirdUser]));
            
        expect(res.body.errors[0].message).toBe('User with id: 3 already exists.');
    })

    it('should return Unauthorized when creating users with user that is not admin', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', secondToken)
            .send(createManyMutation([thirdUser, forthUser]));
            
        expect(res.body.errors[0].message).toBe('Unauthorized.');
    })

    it('should delete user when deleting from same user', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', forthToken)
            .send(createDeleteMutation(4));

        expect(res.body.data.deleteUser).toEqual(true);
    })

    it('should return unauthorized when deleting from same user', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', secondToken)
            .send(createDeleteMutation(5));
            
        expect(res.body.errors[0].message).toEqual('Unauthorized.');
    })

    it('should delete when deleting from user that is admin', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', admintToken)
            .send(createDeleteMutation(5));
            
        expect(res.body.data.deleteUser).toEqual(true);
    })

    it('should return error when deleting nonexistent user', async() => {
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', admintToken)
            .send(createDeleteMutation(4));
            
        expect(res.body.errors[0].message).toEqual(`User with id: 4 is not found.`);
    })
} 
export default userTests;