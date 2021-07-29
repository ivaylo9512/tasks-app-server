import UserRepository from "./base/user-repository";
import User from "../entities/user";
import { EntityRepository } from "@mikro-orm/mysql";
import { EntityData } from "@mikro-orm/core";

export default class UserRepositoryImpl extends EntityRepository<User> implements UserRepository{
    findById(id: number, selections?: string[]){
        return this.findOneOrFail({ id }, selections);
    }

    findUser(user: EntityData<User>, selections?: string[]){
        return this.findOne(user, selections);
    }

    createUser(userInput: EntityData<User>){
        const user = this.create(userInput);
        this.persist(user);
        
        return user;
    }

    delete(user: User){
        this.remove(user);
        return true;
    }

    deleteById(id: number){
        return this.nativeDelete({ id })
    }
}