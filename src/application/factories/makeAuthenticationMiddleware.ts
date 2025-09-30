import { AuthenticationMiddleware } from "../../server/middlewares/AuthenticationMiddleware";
import { makeTokenJwtProvider } from "./makeTokenJwtProvider";

export function makeAuthenticationMiddleware(){
    return new AuthenticationMiddleware(makeTokenJwtProvider());
}