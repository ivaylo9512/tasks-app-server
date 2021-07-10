import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import UserService from "./base/user-service";
import { User } from "src/entities/user";

export default class UserServiceImpl implements UserService{
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;

    constructor(em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>){
        this.em = em;
    }

    async findById(id: number): Promise<User | null>{
        const user = await this.em.findOneOrFail(User, { id });
        return user;
    }

    async delete(id: number): Promise<boolean>{
        await this.em.nativeDelete(User, { id });
        return true;
    }
}