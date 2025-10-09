import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { SignInUseCase } from "../useCases/SignInUseCase";
import z, { ZodError } from "zod";

export class SignInController implements IController{
    constructor(private readonly signInUseCase: SignInUseCase){}

    async handle({ body }: IRequest): Promise<IResponse> {

        const schema = z.object({
            email: z.email(),
            password: z.string().min(8),
        });

        try {
            const { email, password } = schema.parse(body);
            const acessToken = await this.signInUseCase.execute({ email, password });

            return {
                statusCode: 200,
                body: {
                    acessToken,
                },
            };

        } catch (error) {
            
            if(error instanceof ZodError) {
                return {
                    statusCode: 400,
                    body: error.issues,
                };
            };

            if(error instanceof InvalidCredentials) {
                return {
                    statusCode: 401,
                    body: {
                        error: 'Invalid Credentials',
                    },
                };
            };
        }

        throw Error;
    };
};