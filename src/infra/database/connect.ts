  import { Client } from 'pg';
  import { IAccount } from '../../application/interfaces/IAccount';


console.log(process.env.DB_USER)

  export const client = new Client({
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  });

  export async function connectToDatabase(){
    try {
      await client.connect();
      console.log("Conexão estabelecida");
    } catch (error) {
      console.log(error)
    }
}

  export async function query(querySQL: string, params?: string[]): Promise<IAccount[]>{
    const { rows } = await client.query(querySQL, params);

    return rows;
  }


