import { ValidationError } from "class-validator";
import { CustomError } from "./custom.error";

export class RequestValidateError extends CustomError{
    statusCode = 400;
    constructor(private errors: ValidationError[]){
        super("Invalid Request Parameter");
        Object.setPrototypeOf(this, RequestValidateError.prototype);
    }
    serializeErrors() {
        const message = this.errors.map((err)=>{
            return {
                property: err.property, 
                message: Object.values(err.constraints!)[0] || "Unknown validation error!"
            }
        })
        return message;
    }
}