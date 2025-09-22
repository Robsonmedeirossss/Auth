import { SignInUseCase } from "../useCases/SignInUseCase";
import { makeAccountRepository } from "./makeAccountRepository";
import { makeHashProvider } from "./makeHashProvider";
import { makeTokenJwtProvider } from "./makeTokenJwtProvider";

export function makeSignInUseCase(){
  return new SignInUseCase(
    makeAccountRepository(),
    makeHashProvider(),
    makeTokenJwtProvider()
  );
}
