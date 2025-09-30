import { IData, IMiddleware, IRequest, IResponse } from "../../application/interfaces/IMiddleware";
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

        try {
            const payload = this.tokenJwtProvider.verify(authorization, process.env.SECRET_KEY!);

            return {
                data: {
                    accountId: payload.sub,
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