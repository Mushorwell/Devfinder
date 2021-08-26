import IActivity from "../Interfaces/IActivity";

export const SAVE = 'STORE_ACTIVITIES';

export interface UserListAction {
    type: string;
    payload: Array<IActivity> | [];
}

export default function ActivityListReducer (
    state: Array<IActivity> | [] = [],
    action: UserListAction
): Array<IActivity> | [] {
    switch (action.type){
        case SAVE:
            return action.payload;
        default:
            return state;
    }
}