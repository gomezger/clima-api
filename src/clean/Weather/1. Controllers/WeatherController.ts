import { ExpressController } from "../../../utils/Controller";
import { Request, Response, Router } from 'express';
import { inject } from "tsyringe";
import { IWeatherService } from "../2.Services/IWeatherService";

export class WeatherController extends ExpressController{

    constructor(
        @inject(IWeatherService) private _weather: IWeatherService,
    ) { 
        super();
    }

    registerRoutes(): Router {
        const router = Router();
        router.get('city/:city', this.getWeatherCity);
        return router;
    }

    private async getWeatherCity(req: Request, res: Response): Promise<Response> {
        const result = await this._weather.getTodayWeather(req.params.city);
        if(result === null) {
            return res.status(404).send('City don\'t found');
        }
        return res.send(result);
    }


    
}