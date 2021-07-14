import { User } from "src/entities/user";
import Service from "./service";
import { UserInput } from "src/resolvers/types/user-input";
import { LoggedUser } from "src/types";

export default interface UserService extends Service<User>{
    create(UserInput: UserInput): Promise<User>;
    update(UserInput: UserInput, loggedUser: LoggedUser): Promise<User>;
}