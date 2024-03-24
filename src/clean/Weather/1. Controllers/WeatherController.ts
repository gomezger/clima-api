import { ExpressController } from "../../../utils/Controller";
import { Request, Response, Router } from 'express';
import { container, inject, singleton } from "tsyringe";
import { IWeatherService } from "../2.Services/IWeatherService";

@singleton()
export class WeatherController extends ExpressController {

    constructor(
        @inject(IWeatherService) private _weather: IWeatherService,
    ) {
        super();
    }

    registerRoutes(): Router {
        const router = Router();
        router.route('/cities').get(this.getAllCities);
        router.route('/city/detail/:city').get(this.getDetailWeather);
        router.route('/city/:city').get(this.getWeatherCity);
        return router;
    }

    private async getDetailWeather(req: Request, res: Response): Promise<Response> {
        try {
            const weather = container.resolve<IWeatherService>(IWeatherService)
            const result = await weather.getDetailWeather(req.params.city);
            if (result === null) {
                return res.status(404).send();
            }
            return res.status(200).send(result);
        } catch (error: unknown) {
            return res.status(500).send()
        }
    }
    private async getWeatherCity(req: Request, res: Response): Promise<Response> {
        try {
            const weather = container.resolve<IWeatherService>(IWeatherService)
            const result = await weather.getTodayWeather(req.params.city);
            if (result === null) {
                return res.status(404).send();
            }
            return res.status(200).send(result);
        } catch (error: unknown) {
            return res.status(500).send()
        }
    }

    private async getAllCities(req: Request, res: Response): Promise<Response> {
        try {
            const weather = container.resolve<IWeatherService>(IWeatherService)
            const result = await weather.getAllCities();
            if (result === null) {
                return res.status(404).send();
            }
            return res.status(200).send(result);
        } catch (error: unknown) {
            return res.status(500).send()
        }
    }



}