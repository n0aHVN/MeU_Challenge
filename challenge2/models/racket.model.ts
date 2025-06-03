import { QueryResultRow } from "pg";

export interface IRacketModel {
  id: string;
  brand: string;
  description: string;
  racket_name: string;
  slug: string;
  weight: number;
  speed_rating: number;
  vibration_rating: number;
  composition: string;
  racket_size: string;
  thickness: string;
  price: number;
  quantity: number;
  status: 'enable' | 'disable';
  created_at: Date;
  updated_at: Date;
}

