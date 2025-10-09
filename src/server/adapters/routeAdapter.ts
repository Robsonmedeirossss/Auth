import { Request, Response } from "express";
import { IController } from "../../application/interfaces/IController";

export function routeAdapter(controller: IController){
    return async (request: Request, response: Response) => {

        const { statusCode, body } = await controller.handle({
            headers: request.headers as Record<string, string>,
            body: request.body, 
        });

        response.status(statusCode).json(body);
    }
}