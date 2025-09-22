  import { Client } from 'pg';
  import { IAccount } from '../../application/interfaces/IAccount';

  export const client = new Client({
    user: "root",
    port: 5432,
    database: "auth",
    password: "root",
    host: "localhost",
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


