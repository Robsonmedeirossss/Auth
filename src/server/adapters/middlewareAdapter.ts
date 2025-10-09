import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "../../application/interfaces/IMiddleware";

export function middlewareAdapter(middleware: IMiddleware){
    return async (request: Request, response: Response, next: NextFunction) => {

        const responseMiddleware = await middleware.handle({
            headers: request.headers as Record<string, string>,
            body: request.body,
            metadata: request.metadata,
        });

        if("statusCode" in responseMiddleware){
            return response.status(responseMiddleware.statusCode).json(responseMiddleware.body);
        };

            request.metadata = { 
            ...request.metadata,
            ... responseMiddleware.data,
            } ;
    
        next();
    }
}