import { IUserModel } from "./user.model";

export interface IOtpModel{
    username: string,
    email?: string, 
    password?: string,
    otp: string;
    expiredAt?: Date;
}