import pg, { QueryConfig } from "pg";
const Client = pg.Client;
const Pool = pg.Pool;

export const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.PGHOST,
  port: 5432,
  database: process.env.PGDATABASE,
})

export const query = async (queryString: string | QueryConfig<any[]>, value?: any[]) => {
  const client = new Client({ ssl: true });
  await client.connect();
  const result = await client.query(queryString, value);
  await client.end();
  return result;
}

