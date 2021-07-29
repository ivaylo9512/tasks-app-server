import { IMiddlewareFunction } from "graphql-middleware";
import UnauthorizedException from "../../exceptions/unauthorized";
import { Request } from 'express';
import { verify } from "jsonwebtoken";
import { jwtSecret } from "../../utils/jwt";
import { ApolloContext } from "../../types";

type AuthMiddleware = {
    [name: string]: {
        [name: string]: IMiddlewareFunction
    }
}

const authenticate = (async (resolve, parent, args, context: ApolloContext, info) => {
    const jwtUser = getUserFromToken(context.req, context)
    context.foundUser = await context.userService.verifyLoggedUser(jwtUser.id);
 
    return await resolve(parent, args, context, info)
}) as IMiddlewareFunction

const getJwtUser = (async (resolve, parent, args, context: ApolloContext, info) => {
    getUserFromToken(context.req, context);

    return await resolve(parent, args, context, info)
}) as IMiddlewareFunction

const authMiddleware: AuthMiddleware = {
    Mutation: {
        deleteTask: authenticate,
        createTask: authenticate,
        createTasks: authenticate,
        updateTask: authenticate,
        deleteUser: authenticate,
        createUsers: authenticate,
        login: getJwtUser,
        register: getJwtUser,
    },
    Query: {
        tasksByDate: authenticate,
        tasksByState: authenticate,
        taskById: authenticate,
        userById: authenticate,
    }
}

const getUserFromToken = (req: Request, context: ApolloContext) => {
    let token = req.headers?.authorization;
    if(!token){
        throw new UnauthorizedException('No auth token');
    }
    token = token.split(' ')[1];

    const jwtUser = verify(token, jwtSecret);
    context.jwtUser = jwtUser;

    return jwtUser;
}

export default authMiddleware