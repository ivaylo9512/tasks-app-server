import User from "../../entities/user";
import { JwtUser } from "../../types";
import UserInput from "../../resolvers/types/user-input";

export default interface UserService {
    findById(id: number, loggedUser: User): Promise<User>;
    delete(id: number, loggedUser: User): Promise<boolean>;
    login(userFromToken: JwtUser): Promise<User>;
    register(userInput: UserInput): Promise<User>;
}