import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const ChatCollection = "Chat";
/**
 * Chat/{auto_id}
 * Is referenced in UserRelation/{relation_uid}
 */
export interface Chat extends FirebaseFirestoreTypes.DocumentReference {
    usera: string;
    userb: string;
}