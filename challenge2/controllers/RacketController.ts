import { QueryResult, QueryResultRow } from "pg";
import { getPgClient } from "../db/pgClient";
export class RacketController{
    static async getRackets(): Promise<QueryResultRow[]>{
        const pgClient = await getPgClient();
        const data = await pgClient.query("SELECT * FROM racket");
        return data.rows;
    }
}