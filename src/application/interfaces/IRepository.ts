import { IAccount } from "./IAccount";

export interface IRepository{
  findAll(): Promise<IAccount[]>;
  create(user: IAccount): Promise<IAccount>
  findById(id: string): Promise<IAccount | undefined>
  findByEmail(email: string): Promise<IAccount | undefined>
}
