import { QueryResultRow } from "pg";

export interface IRacketModel{
    brand: string,
    description: string,
    racket_name: string,
    weight: number,
    speed_rating: number,
    vibration_rating: number,
    composition: string,
    racket_size: string,
    thickness: string,
    price: number,
    status: string
}
