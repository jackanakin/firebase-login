import { Country } from "./Country";
import { Province } from "./Province";

export interface City {
    name: string;
    coordinates: string;
    Province: Province;
    Country: Country;
}