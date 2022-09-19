

export interface IWeatherRepository {
    getCityHtml(city: string): Promise<string>;
}

export const IWeatherRepository = 'IWeatherRepository';
