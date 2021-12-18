import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const MessagesCollection = "Messages";
/**
 * Messages/{message_id}
 * Is referenced in Chat/{auto_id}/Messages/{auto_id}
 */
export interface Message extends FirebaseFirestoreTypes.DocumentData {
    author: string;
    text: string;
    date: Date;
}