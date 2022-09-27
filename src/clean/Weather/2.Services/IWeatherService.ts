import { Detail } from "../Entities/Detail";
import { TodayWeather } from "../Entities/Today";

export interface IWeatherService {
    getTodayWeather(city: string): Promise<TodayWeather|null>;
    getAllCities(): Promise<Array<string>|null>;
    getDetailWeather(city: string): Promise<Detail|null>;
}

export const IWeatherService = 'IWeatherService';