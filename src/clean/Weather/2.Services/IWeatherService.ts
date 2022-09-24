import { TodayWeather } from "../Entities/Today";

export interface IWeatherService {
    getTodayWeather(city: string): Promise<TodayWeather|null>;
    getAllCities(): Promise<Array<string>|null>;
}

export const IWeatherService = 'IWeatherService';