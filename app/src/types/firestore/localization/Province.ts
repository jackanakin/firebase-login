import { Country } from "./Country";

export interface Province {
    code: string;
    name: string;
    Country: Country;
}