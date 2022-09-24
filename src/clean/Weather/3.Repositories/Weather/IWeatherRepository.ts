

export interface IWeatherRepository {
    getCityHtml(city: string): Promise<string>;
    getDetailCityHtml(city: string): Promise<string>;
    getIndexHtml(): Promise<string>;
}

export const IWeatherRepository = 'IWeatherRepository';
