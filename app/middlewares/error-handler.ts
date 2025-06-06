import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const ErrorHandlerMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction)=>{
    console.log(err);
    if (err instanceof CustomError){
        res.status(err.statusCode).send({
            errors: err.serializeErrors()
        });
        return;
    }
    res.status(400).send({
        errors:[
            {message: err.message}
        ]
    });
    return;
}