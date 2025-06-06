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
    }: IRacketModel){
        const pgClient = await getPgClient();
        const query = `
            UPDATE racket
            SET brand = $1,
                racket_name = $2,
                slug = $3,
                description = $4,
                speed_rating = $5,
                vibration_rating = $6,
                weight = $7,
                composition = $8,
                racket_size = $9,
                thickness = $10,
                price = $11,
                quantity = $12,
                status = $13
            WHERE id = $14
            RETURNING *;
        `;

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
            status,
            id
        ];
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