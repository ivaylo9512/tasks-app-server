import TaskInput from "../resolvers/types/task-input";
import TaskService from "./base/task-service";
import UnauthorizedException from "../exceptions/unauthorized";
import User  from "../entities/user";
import UpdateInput from "../resolvers/types/update-input";
import EntitiyNotFoundException from "../exceptions/enitity-not-found";
import TaskRepository from "src/repositories/base/task-repository";

export default class TaskServiceImpl implements TaskService{
    repo : TaskRepository
    
    constructor(repo: TaskRepository){
        this.repo = repo;
    }  

    async findById(id: number, loggedUser: User) {
        const task = await this.repo.findById(id, ['owner']);
        
        if(task.owner.id != loggedUser.id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized.');
        }

        return task;
    }
    
    async findByDate(date: string, loggedUser: User) {
        return await this.repo.find({ 
            eventDate: new Date(date), 
            owner: loggedUser.id 
        });
    }

    async findByState(state: string, loggedUser: User) {
        return await this.repo.find({ 
            state, owner: 
            loggedUser.id
        });
    }

    async create(taskInput: TaskInput, loggedUser: User) {
        const { name, state, alertAt, eventDate, from, to} = taskInput;

        const task = this.repo.createTask({
            name,
            state, 
            alertAt, 
            eventDate: eventDate ? new Date(eventDate) : undefined, 
            from, 
            to,
            owner: loggedUser
        });
        
        await this.repo.flush();
        
        return task;
    }

    async createMany(taskInputs: TaskInput[], loggedUser: User) {
        if(loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized.')
        }

        const tasks = taskInputs.map(task => {
            const { name, state, alertAt, eventDate, from, to, owner } = task;
            
            return this.repo.create({
                name,
                state, 
                alertAt, 
                eventDate: eventDate ? new Date(eventDate) : undefined, 
                from, 
                to,
                owner
            });
        })
        
        try{
            await this.repo.persist(tasks).flush();            
        }catch(err){
            if(err.code == 23503){
                var reg = /\((.*?)\)/g;
                this.repo.remove(tasks);
                throw new EntitiyNotFoundException(`User with id: ${reg.exec(err.detail) && reg.exec(err.detail)?.[1]} doesn't exist.`)
            }
            throw err;
        }
        
        return tasks;
    }

    async update(taskInput: UpdateInput, loggedUser: User) {
        const {id, name, state, alertAt, eventDate, from, to} = taskInput;
        const task = await this.repo.findById(id, ['owner']);

        if(task.owner.id != loggedUser.id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized.');
        }

        task.name = name;
        task.state = state; 
        task.alertAt = alertAt ? new Date(alertAt) : undefined,
        task.eventDate = eventDate ? new Date(eventDate) : undefined;
        task.from = from; 
        task.to = to;

        await this.repo.flush();

        return task;
    }

    async delete(id: number, loggedUser: User): Promise<boolean> {
        const task = await this.repo.findById(id, ['owner']);
        
        if(task.owner.id != loggedUser.id && loggedUser.role != 'admin'){
            throw new UnauthorizedException('Unauthorized.');
        }
        
        await this.repo.delete(task);
        
        return true;
    }
}