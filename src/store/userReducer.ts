import IUser from "../Interfaces/IUser";

export const SAVE = 'SAVE_USER';

export interface UserAction {
    type: string;
    payload: IUser | null;
}

export default function UserReducer (
    state: IUser | null = null,
    action: UserAction
): IUser | null {
    switch (action.type){
        case SAVE:
            return action.payload;
        default:
            return state;
    }
}