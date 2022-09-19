import { container } from "tsyringe";
import { HTMLRepository } from "./3.Repositories/HTMLRepository";
import { IWeatherRepository } from "./3.Repositories/IWeatherRepository";

export const registerMeteoBahia = () => {
    container.register<IWeatherRepository>(IWeatherRepository, {useClass: HTMLRepository })
}