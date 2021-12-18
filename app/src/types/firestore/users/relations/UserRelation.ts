import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Chat } from "../../messaging/Chat";

export const UserRelationCollection = "UserRelation";
/**
 * UserRelation/{relation_uid}
 */
export interface UserRelation extends FirebaseFirestoreTypes.DocumentData {
    relation_uid: string;
    first_interaction: Date;
    last_interaction: Date;
    ban: boolean;
    denounce: boolean;
    Chat: Chat;
}