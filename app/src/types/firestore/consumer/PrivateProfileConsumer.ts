import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { City } from "../localization/City";

export const PrivateProfileConsumerCollection = "PrivateProfileConsumer";

/**
 * PrivateProfileConsumer/{user_id}
 */
export interface PrivateProfileConsumer extends FirebaseFirestoreTypes.DocumentData {
    owner_uid: string;
    name: string;
    document: string;
    City: City;
    _city?: City;
}