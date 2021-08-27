import IActivity from "../Interfaces/IActivity";

export const SAVE = 'SAVE_ACTIVITY';

export interface activityAction {
    type: string;
    payload: IActivity | null;
}

export default function ActivityReducer (
    state: IActivity | null = null,
    action: activityAction
): IActivity | null {
    switch (action.type){
        case SAVE:
            return action.payload;
        default:
            return state;
    }
}