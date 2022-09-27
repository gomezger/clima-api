import cheerio from 'cheerio';
import { stringify } from 'querystring';
import { Detail } from '../../Entities/Detail';
import { IScraperRepository } from "./IScraperRepository";

type Cheerio = cheerio.Cheerio;
type Element = cheerio.Element;
type Root = cheerio.Root;

export class CheerioRepository implements IScraperRepository {

    getTextByTag(tag: string, html: string): string {
        const $: Root = cheerio.load(html);
        const result: Cheerio = $(tag);
        if (result.length === 0) {
            throw new Error('No hay resultado para el tag ' + tag);
        }
        const text: string = result.first().text();
        if (text === '') {
            throw new Error('No hay data en el result: ' + result[0]);
        }
        return text;
    }

    async getAllTextByTag(tag: string, html: string): Promise<string[]> {
        const $: Root = cheerio.load(html);
        let result: Cheerio = $(tag);
        if (result.length === 0) {
            throw new Error('No hay resultado para el tag ' + tag);
        }
        const cities: Array<string> = [];

        while (result.length !== 0) {
            cities.push(result.first().text());
            result = result.next();
        }

        return cities;
    }

    async getDetail(tag: string, html: string): Promise<Detail> {
        const $: Root = cheerio.load(html);
        let result: Cheerio = $(tag);
        if (result.length === 0) {
            throw new Error('No hay resultado para el tag ' + tag);
        }
        const res: Detail = [];
        let pointerDay = -1;

        //initi
        result = result.next(); // salteo nombre de la ciudad
        result = result.next(); // salteo fila vacia
        result = result.next(); // salteo nombre de las columnas
        result = result.next(); // salteo fila vacia

        while (result.length !== 0 || pointerDay < 7) {
            result = result.children(); // accedo a los td del tr
            const first = result.first();

            if(first.children().length > 0 ){
                result = result.children(); // accedo al font del td
                result = result.children(); // accedo al b del font
                const date = result.first().text(); // obtengo el dia
                // empece un nuevo dia si esta definido
                if (date.length > 3) {
                    pointerDay++;
                    res[pointerDay] = {
                        name: date,
                        days: []
                    };
                }
                result = result.parent(); // vuelvo a font
                result = result.parent(); // vuelto a td
            }
            
            result = result.next(); // avanzo de td
            result = result.children(); // accedo al font del td
            const time = result.first().text(); // obtengo la hora de los datos a leer
            result = result.parent(); // vuelvo al td
            result = result.next(); // avanzo al siguiente td
            result = result.children(); // accedo al font del td
            result = result.children(); // accedo al img del font
            const status = result.first().attr('title'); // busco el attr que describe la imagen
            result = result.parent(); // vuelvo al font
            result = result.parent(); // vuelvo al td
            result = result.next(); // avanzo de td
            result = result.children(); // accedo al font
            const temp = result.first().text(); // obtengo la temp
            result = result.parent(); //vuelvo al td
            result = result.next(); // avanzo de td
            result = result.children(); // accedo al font
            const rain = result.first().text(); // obtengo las lluvia estimada
            result = result.parent(); // vuelvo al td
            result = result.next(); // avanzo de td
            result = result.next(); // avanzo de td
            result = result.children(); // accedo al font
            const wind = result.first().text(); // obtengo el viento estimado
            result = result.parent(); // accedo al td
            result = result.parent(); // accedo al tr
            result = result.next(); // accedo al tr vacio
            result = result.next(); // salteo el tr vacio
            res[pointerDay].days.push({
                temp,
                time,
                wind,
                rain,
                status: status ?? ''
            })
        }

        return res;
    }
}