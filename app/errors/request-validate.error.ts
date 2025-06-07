import { ValidationError } from "express-validator";
import { CustomError } from "./custom.error";

export class RequestValidateError extends CustomError{
    statusCode = 400;
    constructor(private errors: ValidationError[]){
        super("Invalid Request Parameter");
        Object.setPrototypeOf(this, RequestValidateError.prototype);
    }
    serializeErrors() {
        return this.errors.map((err)=>{
            if (err.type == "field")
                return {message: err.msg, field: err.path};
            else return {message: err.msg};
        });
    }
}