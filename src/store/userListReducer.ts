import IUser from "../Interfaces/IUser";

export const SAVE = 'STORE_USERS';

export interface UserListAction {
    type: string;
    payload: Array<IUser> | [];
}

export default function UserListReducer (
    state: Array<IUser> | [] = [],
    action: UserListAction
): Array<IUser> | [] {
    switch (action.type){
        case SAVE:
            // console.log('github users found:', action.payload);
            return action.payload;
        default:
            return state;
    }
}