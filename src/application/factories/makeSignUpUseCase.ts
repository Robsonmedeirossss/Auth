import { SignUpUseCase } from "../useCases/SignUpUseCase";
import { makeAccountRepository } from "./makeAccountRepository";
import { makeHashProvider } from "./makeHashProvider";


export function makeSignUpUseCase(){
  const salt = 10;
  return new SignUpUseCase(
    makeAccountRepository(),
    makeHashProvider(),
    salt
  );
}
