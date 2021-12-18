import { UserRelation } from "./UserRelation";

export const UserHasRelationCollection = "UserHasRelation";
/**
 * UserHasRelation/{user_uid}
 */
export interface UserHasRelation {
    user_uid: string;
    UserRelation: UserRelation[];
}