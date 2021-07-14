import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';
import UserService from './base/user-service';
import { User } from '../entities/user';
import { UserInput } from 'src/resolvers/types/user-input';
import { LoggedUser } from 'src/types';
import UnauthorizedException from '../exceptions/unauthorized'
import EntitiyNotFoundException from '../exceptions/enitity-not-found';

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
        await this.em.persist(user).flush();
        
        return user;
    }
    async update(userInput: UserInput, loggedUser: LoggedUser): Promise<User>{
        if(userInput.id != loggedUser.id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized');
        }
        
        const user = this.em.findOneOrFail(User, {id: userInput.id});
        
        UserServiceImpl.updateFields(user, userInput);

        await this.em.flush();
        
        return user;
    }
    async delete(id: number, loggedUser: LoggedUser): Promise<boolean>{
        if(id != loggedUser.id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized');
        }

        const count = await this.em.nativeDelete(User, {id});

        if(!count){
            throw new EntitiyNotFoundException(`User with id: ${id} is not found`);
        }

        return true;
    }

    static updateFields = (user: {[name: string]: any}, userInput: UserInput) => {
        Object.entries(userInput).forEach(([key, value]) => {
            user[key] = value;
        });
    }
}