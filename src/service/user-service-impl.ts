import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import UserService from "./base/user-service";
import { User } from "../entities/user";
import { UserInput } from "src/resolvers/types/user-input";

export default class UserServiceImpl implements UserService{
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;

    constructor(em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>){
        this.em = em;
    }

    async findById(id: number): Promise<User | null>{
        return await this.em.findOneOrFail(User, { id });
    }

    async create(userInput: UserInput): Promise<User>{
        const user = this.em.create(User, userInput);
        await this.em.persistAndFlush(user)
        
        return user;
    }
    async update(userInput: UserInput): Promise<User>{
        const user = this.em.create(User, userInput);
        await this.em.persistAndFlush(user)
        
        return user;
    }
    async delete(id: number): Promise<boolean>{
        await this.em.nativeDelete(User, { id });
        return true;
    }
}