import { TodayWeather } from "../Entities/Today";
import { singleton, inject } from "tsyringe";
import { IWeatherService } from "./IWeatherService";
import { IWeatherRepository } from "../3.Repositories/IWeatherRepository";

@singleton()
export class MeteoBahia implements IWeatherService {

    constructor(@inject(IWeatherRepository) private _repository: IWeatherRepository) { }

    async getTodayWeather(city: string): Promise<TodayWeather | null> {
        const html = await this._repository.getCityHtml(city);
        return null;
    }

    
}