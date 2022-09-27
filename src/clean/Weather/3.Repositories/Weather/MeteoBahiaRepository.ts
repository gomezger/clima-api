import axios from 'axios';
import { removeAccents } from '../../../../utils/removeAccents';
import { IWeatherRepository } from './IWeatherRepository';

export class MeteoBahiaRepository implements IWeatherRepository {
    
    async getIndexHtml(): Promise<string> {
        const url = (`https://meteobahia.com.ar/index.php`);
        return this.#getData('indexPage', url, 1440); //expires in 1 day
    }

    async getCityHtml(city: string): Promise<string> {
        const url = (`https://meteobahia.com.ar/index.php?estacion=${city.replaceAll(' ', '%20')}`);
        return this.#getData(`${city}-today`, url, 5); // expires in 5 minutes
    }

    async getDetailCityHtml(city: string): Promise<string> {
        const url = (`https://meteobahia.com.ar/detalla.php?estacion=${removeAccents(city.replaceAll(' ', '%20'))}`);
        return this.#getData(`${city}-detail`, url, 60); // expires in 1 hour
    }


    #expired(item?: Item): boolean {
        return item === undefined || item.expires < new Date();
    }

    #saveItem(key: string, string: string, minutes: number): void {
        if(Historial.data.has(key))
            Historial.data.delete(key);

        Historial.data.set(key, {
            data: string,
            date: new Date(),
            expires: new Date(new Date().setMinutes(new Date().getMinutes()+minutes))
        })        
    }

    async #getData(key: string, url: string, minutes: number): Promise<string>{
        if(!Historial.data.has(key) || this.#expired(Historial.data.get(key))){
            const data = await this.#getAxios<string>(url);
            this.#saveItem(key, data, minutes);
            return data;
        }
        return Historial.data.get(key)!.data;
    }
    
    async #getAxios<T>(url: string): Promise<T>{
        const AxiosInstance = axios.create(); 
        const result = await AxiosInstance.get(url);
        return result.data; 
    }
}


type Item = {
    data: string;
    date: Date;
    expires: Date;
}

class Historial {
    static data = new Map<string, Item>();
}


