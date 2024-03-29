import { TodayWeather } from "../Entities/Today";
import { singleton, inject } from "tsyringe";
import { IWeatherService } from "./IWeatherService";
import { IWeatherRepository } from "../3.Repositories/Weather/IWeatherRepository";
import { IScraperRepository } from "../3.Repositories/Scraper/IScraperRepository";
import { removeAccents } from "../../../utils/removeAccents";
import { Detail } from "../Entities/Detail";

@singleton()
export class MeteoBahiaService implements IWeatherService {

    constructor(
        @inject(IWeatherRepository) private _weather: IWeatherRepository,
        @inject(IScraperRepository) private _scraper: IScraperRepository
    ) { }

    async getTodayWeather(city: string): Promise<TodayWeather | null> {
        try {

            // verifico que la ciudad existe
            const cities = await this.getAllCities();
            if(cities === null || !cities.find(c => removeAccents(c) === removeAccents(city)))
                return null;

            // busco la data de la ciudad
            const html = await this._weather.getCityHtml(city);
            const cityResult = this._scraper.getTextByTag('.titulo lg > b', html);
            const temperature = this._scraper.getTextByTag('.redondeado div #principal1col div p > b', html).substring(0, 4);
            const skyStatus = this._scraper.getTextByTag('.redondeado div #principal1col div p > lp', html);
            const date = this._scraper.getTextByTag('.redondeado div p > lp', html);
            const humidity = this._scraper.getTextByTag('.redondeado div #lateral1col div > lp', html).substring(6, 8)
            const thermalSensation = this._scraper.getTextByTag('.redondeado div #principal1col div > lp', html).substring(4, 7);

            return {
                city: cityResult,
                temperature: Number(temperature),
                skyStatus,
                date,
                humidity: Number(humidity),
                thermalSensation: Number(thermalSensation)
            };
        } catch (error: unknown) {
            return null;
        }
    }

    async getDetailWeather(city: string): Promise<Detail|null> {
        try {

            // verifico que la ciudad existe
            const cities = await this.getAllCities();
            if(cities === null || !cities.find(c => removeAccents(c) === removeAccents(city)))
                return null;

            // busco la data de la ciudad
            const html = await this._weather.getDetailCityHtml(city);
            const detail = this._scraper.getDetail('.metro .striped tbody tr', html);

            return detail;
        } catch (error: unknown) {
            return null;
        }
    }


    async getAllCities(): Promise<Array<string>|null> {
        try {
            const html = await this._weather.getIndexHtml();
            const options = this._scraper.getAllTextByTag('.input-control #combociudad optgroup option', html)
            return options;
        } catch (error: unknown) {
            return null;
        }
    }


}