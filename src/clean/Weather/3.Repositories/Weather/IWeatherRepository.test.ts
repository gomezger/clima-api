import 'reflect-metadata';
import 'jest';
import { container } from "tsyringe";
import { IWeatherRepository } from './IWeatherRepository';
import { registerDependecies } from '../../../../utils/registerDependecies';
registerDependecies();

describe('IWeatherRepository', () => {

    it('html run correctly', async () => {
        const meteoBahiaRepository = container.resolve<IWeatherRepository>(IWeatherRepository);
        const result = await meteoBahiaRepository.getCityHtml('Bahía Blanca (Centro)');
        expect(result).toBeDefined();
    });


});