import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "../application/interfaces/IMiddleware";

export function middlewareAdapter(middleware: IMiddleware){
    return async (request: Request, response: Response, next: NextFunction) => {

        const responseMiddleware = await middleware.handle({
            headers: request.headers as Record<string, string>
        });

        if("statusCode" in responseMiddleware){
            return response.status(responseMiddleware.statusCode).json(responseMiddleware.body);
        };

            const { accountId } = responseMiddleware.data;
            request.metadata = { accountId } ;
    
        next();
    }
}