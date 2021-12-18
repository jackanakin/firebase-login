import { City } from "../localization/City";

export interface PrivateProfileConsumer {
    owner_uid: string;
    name: string;
    document: string;
    City: City;
}