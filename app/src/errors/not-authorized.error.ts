import { CustomError } from "./custom.error";

export class NotAuthorizedError extends CustomError{
    statusCode = 401;
    constructor(msg:string){
        super(msg);
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors(): { message: string; property?: string; }[] {
        return [{
            message: this.message
        }]
    }
}