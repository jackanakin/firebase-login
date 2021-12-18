import { City } from "../localization/City";

export const PrivateProfileProviderCollection = "PrivateProfileProvider";
/**
 * PrivateProfileProvider/{user_id}
 */
export interface PrivateProfileProvider {
    owner_uid: string;
    name: string;
    document: string;
    is_trainer: boolean;
    is_nutritionist: boolean;
    City: City;
}