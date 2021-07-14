export default class EntitiyNotFoundException extends Error{
    status: number;
    
    constructor(message: string){
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.status = 404;
        this.name = this.constructor.name;
    }

    statusCode(){
        return this.status;
    }
}