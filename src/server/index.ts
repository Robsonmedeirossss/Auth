// import "../infra/config/dotenv";
import express, { Request, Response } from "express";

import { connectToDatabase } from "../infra/database/connect";

import { makeSignUpController } from "../application/factories/makeSignUpController";
import { makeSignInController } from "../application/factories/makeSignInController";
import { routeAdapter } from "../adapters/routeAdapter";
import { makeListLeadsController } from "../application/factories/makeListLeadsController";
import { middlewareAdapter } from "../adapters/middlewareAdapter";
import { makeAuthenticationMiddleware } from "../application/factories/makeAuthenticationMiddleware";

async function startServer(){
    await connectToDatabase();
    const app = express();
    app.use(express.json());

    app.listen(process.env.PORT, () => {
        console.log(`Server started at: http://localhost:${process.env.PORT}`);
    });

    app.get('/', (request, response) => {

        response.status(200).json({
            success: true,
        });
    });

    app.post('/sign-up', routeAdapter(makeSignUpController()));
    app.post('/sign-in', routeAdapter(makeSignInController()));

    app.get('/leads', 
        middlewareAdapter(makeAuthenticationMiddleware()),
        routeAdapter(makeListLeadsController())
    );
}

startServer();