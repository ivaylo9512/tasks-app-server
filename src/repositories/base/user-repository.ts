import User from "../../entities/user";
import { EntityData } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/mysql";

export default interface UserRepository extends EntityRepository<User>{
    findById(id: number, selections?: string[]): Promise<User>;
    findUser(user: EntityData<User>, selections?: string[]): Promise<User | null>
    delete(user: User): boolean;
    deleteById(id: number): Promise<number>;
    createUser(user: EntityData<User>): User;
}