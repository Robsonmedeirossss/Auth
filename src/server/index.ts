// import "../infra/config/dotenv";
import express, { Request, Response } from "express";

import { connectToDatabase } from "../infra/database/connect";

import { makeSignUpController } from "../application/factories/makeSignUpController";
import { makeSignInController } from "../application/factories/makeSignInController";
import { routeAdapter } from "../server/adapters/routeAdapter";
import { makeListLeadsController } from "../application/factories/makeListLeadsController";
import { middlewareAdapter } from "../server/adapters/middlewareAdapter";
import { makeAuthenticationMiddleware } from "../application/factories/makeAuthenticationMiddleware";
import { makeAuthorizationMiddleware } from "../application/factories/makeAuthorizationMiddleware";
import { CorsMiddleware } from "./middlewares/CorsMiddleware";

async function startServer(){
    await connectToDatabase();
    const app = express();
    app.use(express.json());

    app.post('/sign-up', routeAdapter(makeSignUpController()));
    app.post('/sign-in', routeAdapter(makeSignInController()));

    app.get('/leads', 
        CorsMiddleware,
        middlewareAdapter(makeAuthenticationMiddleware()),
        routeAdapter(makeListLeadsController())
    );
    app.post('/leads', 
        middlewareAdapter(makeAuthenticationMiddleware()),
        middlewareAdapter(makeAuthorizationMiddleware(['ADMIN', 'USER'])),
        (request, response) => {
            response.json({ created: true });
        }
    );

     app.listen(process.env.PORT, () => {
        console.log(`Server started at: http://localhost:${process.env.PORT}`);
    });
}

startServer();