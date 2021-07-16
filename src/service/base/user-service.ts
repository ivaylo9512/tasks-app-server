import { User } from "src/entities/user";
import { UserInput } from "src/resolvers/types/user-input";
import { LoggedUser } from "src/types";

export default interface UserService {
    findById(id: number): Promise<User | null>;
    create(UserInput: UserInput): Promise<User>;
    update(UserInput: UserInput, loggedUser: LoggedUser): Promise<User>;
    delete(id: number, loggedUser: LoggedUser): Promise<boolean>;
}