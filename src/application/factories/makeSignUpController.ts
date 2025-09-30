import { makeSignUpUseCase } from "./makeSignUpUseCase";
import { SignUpController } from "../controllers/SignUpController";

export function makeSignUpController() {
    return new SignUpController(makeSignUpUseCase());
}