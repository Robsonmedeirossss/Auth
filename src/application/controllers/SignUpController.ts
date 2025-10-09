import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError";
import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { SignUpUseCase } from "../useCases/SignUpUseCase";
import z, { ZodError } from "zod";


export class SignUpController implements IController{
    constructor(private readonly signUpUseCase: SignUpUseCase){}
    
    async handle({ body }: IRequest): Promise<IResponse>{
        
        const schema = z.object({
            name: z.string().min(2),
            email: z.email(),
            password: z.string().min(8),
        });

        try {
            const { name, email, password } = schema.parse(body);
            const account = await this.signUpUseCase.execute({ name, email, password });

            return {
                statusCode: 201,
                body: {
                    account,
                }
            }
        } catch (error) {
            
            if(error instanceof ZodError){
                return {
                    statusCode: 400,
                    body: error.issues,
                }
            }

            if(error instanceof EmailAlreadyExistsError){
                return {
                    statusCode: 409,
                    body: {
                        message: 'this email is already in use',
                    }
                }
            }

            throw error;
        }
    }
}