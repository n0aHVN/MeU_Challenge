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
        slug, 
        description, 
        speed_rating, 
        vibration_rating, 
        weight, 
        composition, 
        racket_size, 
        thickness, 
        price,
        quantity,
        status
    }: IRacketModel)
    : Promise<boolean>{
        const pgClient = await getPgClient();
        const query = `INSERT INTO racket 
            (brand, racket_name, slug, description, speed_rating, vibration_rating, weight, composition, racket_size, thickness, price, quantity, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;`;
        const values = [
            brand, 
            racket_name,
            slug,
            description, 
            speed_rating, 
            vibration_rating, 
            weight, 
            composition, 
            racket_size, 
            thickness, 
            price,
            quantity,
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

    static async putRacketByID(id: string, {
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
    }: IRacketModel){
        const pgClient = await getPgClient();
        const query = `UPDATE racket
                SET brand = $1,
                    racket_name = $2,
                    description = $3,
                    speed_rating = $4,
                    vibration_rating = $5,
                    weight = $6,
                    composition = $7,
                    racket_size = $8,
                    thickness = $9,
                    price = $10,
                    status = $11
                WHERE id = $12
                RETURNING *;`;
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
            status,
            id
        ]
        const result = await pgClient.query(query, values);
        if (result.rowCount && result.rowCount > 0){
            return true;
        }
        else{
            return false;
        }
    }

    static async deleteRacketById(id: string){
        const pgClient = await getPgClient();
        const query = "DELETE FROM racket WHERE id = $1";
        const result = await pgClient.query(query,[id]);
        if (result.rowCount && result.rowCount > 0){
            return true;
        }
        else{
            return false;
        }
    }
}