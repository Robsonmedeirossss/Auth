import { SignInController } from "../controllers/SignInController";
import { makeSignInUseCase } from "../factories/makeSignInUseCase";

export function makeSignInController(){
    return new SignInController(makeSignInUseCase());
}