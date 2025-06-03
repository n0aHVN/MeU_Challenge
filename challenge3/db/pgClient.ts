import pkg from 'pg';
import { Client } from 'pg';
//Declare pgClient
let pgClient: pkg.Client | null = null;

export async function getPgClient(): Promise<Client> {
  if (!pgClient) {
    pgClient = new Client({
      host: process.env.PGHOST,
      port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    });

    await pgClient.connect();
  }

  return pgClient;
}
