import { IData, IMiddleware, IResponse } from "../../application/interfaces/IMiddleware";
import { IRequest } from "../../application/interfaces/IRequest";

export class AuthorizationMiddleware implements IMiddleware{
    constructor(private readonly allowedOrigins: string[]){}

    async handle({ metadata }: IRequest): Promise<IResponse | IData>{

        console.log('log authorization middleware', metadata);
    
        if(!metadata?.account){
            return {
                statusCode: 403,
                body: {error: 'Acess denied!'}
            }
        }

        if(!this.allowedOrigins.includes(metadata.account.role)){
            return {
                statusCode: 403,
                body: {error: 'Acess denied!'}
            }
        }

        return {
            data: {}
        }
      
    }

}