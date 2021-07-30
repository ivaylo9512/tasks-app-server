import UserService from './base/user-service';
import User from '../entities/user';
import UnauthorizedException from '../exceptions/unauthorized'
import { JwtUser } from '../types';
import UserInput from '../resolvers/types/user-input';
import EntitiyExistException from '../exceptions/enitity-exist';
import EntitiyNotFoundException from '../exceptions/enitity-not-found';
import UserRepository from 'src/repositories/base/user-repository';

export default class UserServiceImpl implements UserService{
    repo: UserRepository;

    constructor(repo: UserRepository){
        this.repo = repo;
    }

    async findById(id: number, loggedUser: User): Promise<User>{
        if(loggedUser.id != id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized.')
        }
        return await this.repo.findById(id)
    }

    async login(userFromToken: JwtUser){
        let user = await this.repo.findUser({id: userFromToken.id});
        if(!user){
            return await this.register(userFromToken);
        }

        return user;
    }

    async register(userInput: UserInput){
        const user = await this.create(userInput);

        this.repo.persist(user).flush();

        return user;
    }

    async createMany(userInputs: UserInput[], loggedUser: User){
        if(loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized.');
        }

        const users = await Promise.all(userInputs
            .map(async user => await this.create(user)));
        this.repo.persist(users).flush();

        return users;
    }

    async create(userInput: UserInput){
        let user = await this.repo.findOne({id: userInput.id})
        if(user){
            throw new EntitiyExistException(`User with id: ${user.id} already exists.`)
        }

        return this.repo.create(userInput);
    }

    async delete(id: number, loggedUser: User): Promise<boolean>{
        if(id != loggedUser.id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized.');
        }

        const count = await this.repo.deleteById(id);

        if(!count){
            throw new EntitiyNotFoundException(`User with id: ${id} is not found.`);
        }

        return true;
    }

}