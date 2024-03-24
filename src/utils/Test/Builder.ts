import { registerDependecies } from "../registerDependecies";

export abstract class Builder {
    constructor(){
        registerDependecies();
    }
}