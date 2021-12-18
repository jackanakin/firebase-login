import { City } from "../localization/City";

export interface PublicProfileProvider {
    owner_uid: string;
    name: string;
    is_trainer: boolean;
    is_nutritionist: boolean;
    is_trainer_qualified: boolean;
    is_nutritionist_qualified: boolean;
    City: City;
}