import { Detail } from "../../Entities/Detail";

export interface IScraperRepository {
    getTextByTag(tag: string, html: string): string;
    getAllTextByTag(tag: string, html: string): Promise<string[]>;
    getDetail(tag: string, html: string): Promise<Detail>;
}

export const IScraperRepository = 'IScraperRepository';