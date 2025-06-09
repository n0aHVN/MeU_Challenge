import { getPgClient } from "../db/pgClient";
import { IOtpModel } from "../models/otp.model";
import { EmailService } from "../services/email.service";

export class OtpController {
    static async getOtp(
        {username, otp}:IOtpModel
    ): Promise<IOtpModel> {
        const pgClient = await getPgClient();
        const query = `SELECT * FROM otp 
            WHERE username = $1 AND otp = $2`;
        const values = [username, otp];
        const data = await pgClient.query(query, values);
        return data.rows[0];
    }
    static async ifUsernameExist(username:string): Promise<boolean>{
        const pgClient = await getPgClient();
        const query = `SELECT * FROM otp 
            WHERE username = $1`;
        const data = await pgClient.query(query, [username]);
        return data.rowCount == 0 ? false : true;
    }

    static async addOtp({
        username,
        email,
        password,
        otp,
    }: IOtpModel): Promise<boolean> {
        //Expire after 15m
        const expiredAt = new Date(Date.now() + 15 * 60 * 1000);
        const pgClient = await getPgClient();
        const query = `INSERT INTO otp
            (username, email, password, otp, expired_at) 
            VALUES
            ($1,$2,$3,$4,$5)`;
        const values = [username, email, password, otp, expiredAt];
        const result = await pgClient.query(query, values);
        if ((result.rowCount ?? 0) == 0) {
            return false;
        }
        return true;
    }
    static async deleteOtp(username: string) {
        const pgClient = await getPgClient();
        const query = `DELETE FROM otp
            WHERE username = $1`;
        const result = await pgClient.query(query, [username]);
        if (result.rowCount == 0) {
            return false;
        }
        return true;
    }
}