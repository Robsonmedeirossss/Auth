import { makeSignUpUseCase } from "../application/factories/makeSignUpUseCase";
import { makeSignInUseCase } from "../application/factories/makeSignInUseCase";
import { connectToDatabase } from "../infra/database/connect";

import { AccountRepository } from "../infra/repositories/AccountRepository";


connectToDatabase();


async function teste(){
  const account = await makeSignUpUseCase().execute({name: "Robson", email: "robsondeiros125@gmail.com", password: "123456"});

  console.log(account)
}

teste();

// const signIn = makeSignInUseCase();

// const token = signIn.execute({email: "robsonmedeiros125@gmail.com", password: "123456"});

// console.log(token);





