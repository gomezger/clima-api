import { container } from "tsyringe";
import { MeteoBahiaRepository } from "./3.Repositories/Weather/MeteoBahiaRepository";
import { IWeatherRepository } from "./3.Repositories/Weather/IWeatherRepository";
import { IScraperRepository } from "./3.Repositories/Scraper/IScraperRepository";
import { CheerioRepository } from "./3.Repositories/Scraper/CheerioRepository";
import { IWeatherService } from "./2.Services/IWeatherService";
import { MeteoBahiaService } from "./2.Services/MeteoBahiaService";

export const registerMeteoBahia = () => {
    container.register<IWeatherRepository>(IWeatherRepository, {useClass: MeteoBahiaRepository });
    container.register<IScraperRepository>(IScraperRepository, {useClass: CheerioRepository });
    container.register<IWeatherService>(IWeatherService, {useClass: MeteoBahiaService });
}