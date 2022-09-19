import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { container } from "tsyringe";
import { PruebaController } from './clean/Prueba/Controllers/PruebaController';

export class App {
    app: Express = express();

    constructor() {
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
        this.routerResgister();
    }

    public getExpressApp(): Express {
        return this.app;
    }

    public listen(): void {
        const port: string = process.env.PORT ?? '3000';
        this.getExpressApp().listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    }

    private routerResgister(): void {
        this.getExpressApp().use('/api/prueba/', container.resolve<PruebaController>(PruebaController).registerRoutes());
    }
    
}
