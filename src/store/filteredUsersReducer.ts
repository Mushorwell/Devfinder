import IUser from "../Interfaces/IUser";

export const SAVE = 'STORE_FILTERED_USERS';

export interface FilteredUsersAction{
    type: string;
    payload: Array<IUser>;
}

const initialValue: Array<IUser> = [];

export default function FilteredUsersReducer(
    state: Array<IUser> = initialValue,
    action: FilteredUsersAction
): Array<IUser> {
    switch (action.type){
        case SAVE:
            return action.payload;
        default:
            return state;
    }
}