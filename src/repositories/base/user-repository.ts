import User from "../../entities/user";
import { EntityData } from "@mikro-orm/core";

export default interface UserRepository {
    findById(id: number, selections?: string[]): Promise<User>;
    findUser(user: EntityData<User>, selections: string[]): Promise<User | null>
    delete(user: User): boolean;
    deleteById(id: number): Promise<number>;
    createUser(user: EntityData<User>): User;
}