import { LoggedUser } from "src/types";

export default interface Service<T>{
    findById(id: number): Promise<T | null>;
    delete(id: number, loggedUser: LoggedUser): Promise<boolean>;
}