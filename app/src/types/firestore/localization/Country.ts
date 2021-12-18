import { Currency } from "../currency/Currency";
import { Language } from "./Language";

export interface Country {
    code: string;
    Languages: Language[];
    Currencies: Currency[];
}