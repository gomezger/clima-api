import 'reflect-metadata';
import 'jest';
import { container } from "tsyringe";
import { registerDependecies } from '../../../utils/registerDependecies';
import { IWeatherService } from './IWeatherService';
import { registerMock } from '../../../utils/Test';
import { Builder } from '../../../utils/Test/Builder';

beforeEach(()=>{
    registerDependecies();
    jest.setTimeout(30000);
})


describe('IWeatherService', () => {

    it('[I] getCity -> return a valid result', async () => {
        const service = container.resolve<IWeatherService>(IWeatherService);
        const result = await service.getTodayWeather('Bahía Blanca (Centro)')
        expect(result).not.toBe(null);
        if(result){
            expect(isNaN(result.humidity)).toBeFalsy();
            expect(isNaN(result.temperature)).toBeFalsy();
            expect(isNaN(result.thermalSensation)).toBeFalsy();
        }
    });

    it('[I] getAllCities -> return a valid result', async () => {
        const service= container.resolve<IWeatherService>(IWeatherService);
        const result = await service.getAllCities();
        expect(result).not.toBe(null);
        expect(result?.length).toBeGreaterThanOrEqual(0);
    });


    it('[I] getDetailWeather -> return a valid result', async () => {
        const service = container.resolve<IWeatherService>(IWeatherService);
        const result = await service.getDetailWeather('Bahía Blanca (Centro)');
        expect(result).not.toBe(null);
    });

    it('[U] getDetailWeather -> city doesn\'t exists', async () => {
        //arrange
        const builder = new BuilderWeatherService().mockGetAllCities(['Monte']);

        //act
        const result = await builder.weatherService.getDetailWeather('Bahia');
        
        //assert
        expect(result).toBe(null);
    });

    it('[U] getTodayWeather -> city doesn\'t exists', async () => {
        //arrange
        const builder = new BuilderWeatherService().mockGetAllCities(['Monte']);

        //act
        const result = await builder.weatherService.getTodayWeather('Bahia');
        
        //assert
        expect(result).toBe(null);
    });

  
});


class BuilderWeatherService extends Builder{
    weatherService: IWeatherService;

    constructor(){
        super();
        this.weatherService = container.resolve<IWeatherService>(IWeatherService);
    }

    mockGetAllCities(cities: string[]): BuilderWeatherService{
        this.weatherService.getAllCities = async () => cities;
        registerMock(IWeatherService, this.weatherService);
        return this;
    }
}

