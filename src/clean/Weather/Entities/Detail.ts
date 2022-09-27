

export type DayDetail = {
    time: string;
    temp: string;
    status: string;
    rain: string;
    wind: string;
};

export type Detail = {
    days: DayDetail[];
    name: string;
}[];
