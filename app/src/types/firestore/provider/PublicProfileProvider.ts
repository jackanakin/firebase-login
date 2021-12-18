import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const PublicProfileProviderCollection = "PublicProfileProvider";

/**
 * PublicProfileProvider/{provider_uid}
 */
export interface PublicProfileProvider extends FirebaseFirestoreTypes.DocumentData {
    owner_uid: string;
    name: string;
    is_trainer: boolean;
    is_nutritionist: boolean;
    is_trainer_qualified: boolean;
    is_nutritionist_qualified: boolean;
    city: string;
}