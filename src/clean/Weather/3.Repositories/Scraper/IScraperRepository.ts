
export interface IScraperRepository {
    getTextByTag(tag: string, html: string): string;
}

export const IScraperRepository = 'IScraperRepository';