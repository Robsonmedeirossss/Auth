import { AccountRepository } from "../../infra/repositories/AccountRepository";

export function makeAccountRepository(){
  return new AccountRepository();
}
