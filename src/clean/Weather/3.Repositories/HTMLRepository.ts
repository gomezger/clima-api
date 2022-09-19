import axios from 'axios';
import { IWeatherRepository } from './IWeatherRepository';


export class HTMLRepository implements IWeatherRepository {
    async getCityHtml(city: string): Promise<string> {
        const url = `https://meteobahia.com.ar/index.php?estacion=${city}`; // URL we're scraping
        const AxiosInstance = axios.create(); // Create a new Axios Instance
        const result = await AxiosInstance.get(url);
        const html = result.data; // Get the HTML from the HTTP request
        return html;
    }
}

