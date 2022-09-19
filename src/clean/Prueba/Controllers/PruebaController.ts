import { ExpressController } from "../../../utils/Controller";
import { Request, Response, Router } from 'express';

export class PruebaController extends ExpressController{

    registerRoutes(): Router {
        const router = Router();
        router.get('', this.index);
        return router;
    }

    private index (req: Request, res: Response): Response {
        return res.send('Clima app');
    }


    
}