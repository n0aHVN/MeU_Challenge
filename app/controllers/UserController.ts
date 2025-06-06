import { getPgClient } from "../db/pgClient";
import { IUserModel } from "../models/user.model";

export class UserController{
    static async findUser(username: string, password: string){
        const pgClient = await getPgClient();
        const query = `SELECT * FROM "user" 
                    WHERE username = $1 AND password = $2`;
        const values = [username, password]
        const result = await pgClient.query(query, values);
        return result.rows[0];
    }

    static async createUser({
        username,
        email,
        password
    }:IUserModel){
        const pgClient = await getPgClient();
        const query = `INSERT INTO "user" (username, email, password) 
            VALUES ($1, $2, $3)`;
        const values = [username, email, password];
        const result = await pgClient.query(query, values);
        if (result.rowCount!= 0){
            return true;
        }
        else return false;
    }
}