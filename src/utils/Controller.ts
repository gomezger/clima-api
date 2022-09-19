import express, { Express, Router } from 'express';

export abstract class ExpressController {
    protected express: Express = express();
    abstract registerRoutes(): Router;
}