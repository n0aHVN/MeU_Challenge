import { QueryResult, QueryResultRow } from "pg";
import { getPgClient } from "../db/pgClient";
import { IRacketModel } from "../models/racket.model";
export class RacketController{
    static async getRackets(): Promise<QueryResultRow[]>{
        const pgClient = await getPgClient();
        const data = await pgClient.query("SELECT * FROM racket");
        return data.rows;
    }

    static async createNewRacket({
        brand, 
        racket_name, 
        description, 
        speed_rating, 
        vibration_rating, 
        weight, 
        composition, 
        racket_size, 
        thickness, 
        price, 
        status
    }: IRacketModel)
    : Promise<boolean>{
        const pgClient = await getPgClient();
        const query = `INSERT INTO racket 
            (brand, racket_name, description, speed_rating, vibration_rating, weight, composition, racket_size, thickness, price, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
        const values = [
            brand, 
            racket_name, 
            description, 
            speed_rating, 
            vibration_rating, 
            weight, 
            composition, 
            racket_size, 
            thickness, 
            price, 
            status
        ]
        const result = await pgClient.query(query, values);
        if (result.rowCount && result.rowCount > 0){
            return true;
        }
        else{
            return false;
        }
    }
}