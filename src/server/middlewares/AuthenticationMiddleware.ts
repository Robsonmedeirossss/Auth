import { JwtPayload } from "jsonwebtoken";
import { IData, IMiddleware, IResponse } from "../../application/interfaces/IMiddleware";
import { IRequest } from "../../application/interfaces/IRequest";
import { ITokenJwtProvider } from "../../application/interfaces/ITokenJwtProvider";

export class AuthenticationMiddleware implements IMiddleware {
    constructor(private readonly tokenJwtProvider: ITokenJwtProvider) { }

    async handle(request: IRequest): Promise<IResponse | IData> {

        const { authorization } = request.headers;

        if (!authorization) {
            return {
                statusCode: 400,
                body: { error: "Token is required" },
            };
        };
        
        const [bearer, acessToken] = authorization?.split(' ');

        try {

            if(!bearer || bearer !== 'Bearer') throw Error();

            const payload = this.tokenJwtProvider.verify(acessToken!, process.env.SECRET_KEY!) as JwtPayload;

            return {
                data: {
                    account: {
                        id: payload.sub,
                        role: payload.role,
                    }
                },
            };

        } catch {

            return {
                statusCode: 401,
                body: {
                    error: "Unauthorized",
                },
            };

        };

    }
}