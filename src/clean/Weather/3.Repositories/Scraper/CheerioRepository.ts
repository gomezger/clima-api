import cheerio from 'cheerio';
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

    // async getAllTextByTag(tag: string, html: string): Promise<string[]> {
    //     const $: Root = cheerio.load(html);
    //     const result: Cheerio = $(tag);
    //     if (result.length === 0) {
    //         throw new Error('No hay resultado para el tag ' + tag);
    //     }
    //     const text: string = result.;
    //     if (text === '') {
    //         throw new Error('No hay data en el result: ' + result[0]);
    //     }
    //     return text;
    // }
}