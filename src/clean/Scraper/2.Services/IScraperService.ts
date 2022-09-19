
export interface IScraperService {
    getTitle(html: string): Promise<string>;
}