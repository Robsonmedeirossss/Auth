import { AuthorizationMiddleware } from "../../server/middlewares/AuthorizationMiddleware";

export function makeAuthorizationMiddleware(allowedOrigins: string[]) {
    return new AuthorizationMiddleware(allowedOrigins);
}