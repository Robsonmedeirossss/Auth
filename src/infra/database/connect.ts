  import { Pool } from 'pg';
  import { IAccount } from '../../application/interfaces/IAccount';

  export const pool = new Pool({
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  });

  export async function connectToDatabase(){
    try {
      await pool.connect();
      console.log("Conexão estabelecida");
    } catch (error) {
      console.log(error)
    }
}

  export async function query(querySQL: string, params?: string[]): Promise<IAccount[]>{
    const { rows } = await pool.query(querySQL, params);

    return rows;
  }


