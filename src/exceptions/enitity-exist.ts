export default class EntitiyExistException extends Error{
    status: number;
    
    constructor(message: string){
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.status = 422;
        this.name = this.constructor.name;
    }

    statusCode(){
        return this.status;
    }
}