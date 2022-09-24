import 'reflect-metadata';
import 'jest';
import { container } from "tsyringe";
import { registerDependecies } from '../../../utils/registerDependecies';
import { IWeatherService } from './IWeatherService';
registerDependecies();
jest.setTimeout(30000);

describe('IWeatherService (Integration)', () => {

    it('getCity --> integration test', async () => {
        const service = container.resolve<IWeatherService>(IWeatherService);
        const result = await service.getTodayWeather('Bahía Blanca (Centro)')
        expect(result).not.toBe(null);
        if(result){
            expect(isNaN(result.humidity)).toBeFalsy();
            expect(isNaN(result.temperature)).toBeFalsy();
            expect(isNaN(result.thermalSensation)).toBeFalsy();
        }
    });

    it('getallCities --> integration test', async () => {
        const service= container.resolve<IWeatherService>(IWeatherService);
        const result = await service.getAllCities();
        expect(result).not.toBe(null);
        expect(result?.length).toBeGreaterThanOrEqual(0);
    });

});