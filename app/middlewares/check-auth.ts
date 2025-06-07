import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const CheckAuthMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const {token} = req.session||{};
    if (!token){
        throw new Error("Not Authorized");
    }
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
}