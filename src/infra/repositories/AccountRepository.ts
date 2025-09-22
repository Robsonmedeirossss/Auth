import { IAccount } from "../../application/interfaces/IAccount";
import { query } from "../database/connect";
import { IRepository } from "../../application/interfaces/IRepository";


export class AccountRepository implements IRepository{


  async findAll(): Promise<IAccount[]>{
    const accounts = await query(`SELECT * FROM accounts;`);

    return accounts;
  }

  async create({ name, email, password }: IAccount): Promise<IAccount>{
    const [ account ] = await query(`
      INSERT INTO accounts (name, email, password)
      VALUES ($1, $2, $3) RETURNING *;
    `, [name, email, password]);

    return account;
  }

  async findById(id: string): Promise<IAccount | undefined>{
    const [ account ] = await query(`
      SELECT * FROM accounts WHERE id = $1;
    `, [id]);

    return account || undefined;
  }

  async findByEmail(email: string): Promise<IAccount | undefined>{
    const [ account ] = await query(`
      SELECT * FROM accounts WHERE email = $1;
    `, [email]);

    return account || undefined;
  }

}

