import { City } from "../localization/City";

export interface PublicProfileConsumer {
    owner_uid: string;
    name: string;
    City: City;
}