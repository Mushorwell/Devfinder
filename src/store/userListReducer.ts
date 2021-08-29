import { IUserList } from "../Interfaces/IUser";

export const SAVE = 'STORE_USERS';

export interface UserListAction {
    type: string;
    payload: IUserList;
}

const initialValue = {
    currentPage: 1,
    totalPages: 1,
    loadedUsers: [],
}

export default function UserListReducer (
    state: IUserList = initialValue,
    action: UserListAction
): IUserList {
    switch (action.type){
        case SAVE:
            // console.log('github users found:', action.payload);
            return action.payload;
        default:
            return state;
    }
}