import 'reflect-metadata';
import 'jest';
import { container } from "tsyringe";
import { registerDependecies } from '../../../utils/registerDependecies';
import { IWeatherRepository } from '../3.Repositories/Weather/IWeatherRepository';
import { IScraperRepository } from '../3.Repositories/Scraper/IScraperRepository';
import { IWeatherService } from './IWeatherService';
registerDependecies();
jest.setTimeout(30000);

describe('IWeatherService (Integration)', () => {

    // it('html run correctly', async () => {
    //     const meteoBahiaRepository = container.resolve<IWeatherRepository>(IWeatherRepository);
    //     const scrapperRepository = container.resolve<IScraperRepository>(IScraperRepository);

    //     const html = await meteoBahiaRepository.getCityHtml('Bahía Blanca (Centro)');



    //     expect(html).toBeDefined();
    // });

    it('getCity --> integration test', async () => {
        const service= container.resolve<IWeatherService>(IWeatherService);
        const result = await service.getTodayWeather('Bahía Blanca (Centro)')
        expect(result).not.toBe(null);
        if(result){
            expect(isNaN(result.humidity)).toBeFalsy();
            expect(isNaN(result.temperature)).toBeFalsy();
            expect(isNaN(result.thermalSensation)).toBeFalsy();
        }
    });

});