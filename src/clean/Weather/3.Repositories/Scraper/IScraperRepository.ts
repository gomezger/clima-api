
export interface IScraperRepository {
    getTextByTag(tag: string, html: string): string;
    getAllTextByTag(tag: string, html: string): Promise<string[]>;
}

export const IScraperRepository = 'IScraperRepository';