import axios from 'axios';
import { IWeatherRepository } from './IWeatherRepository';


export class MeteoBahiaRepository implements IWeatherRepository {
    async getCityHtml(city: string): Promise<string> {
        city = city.replaceAll(' ', '%20')
        const url = (`https://meteobahia.com.ar/index.php?estacion=${city}`);
        const AxiosInstance = axios.create(); 
        const result = await AxiosInstance.get(url);
        const html = result.data; 
        return html;
    }
}

