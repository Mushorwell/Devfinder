export const SAVE = 'STORE_LOAD_STATE';

export interface LoadingAction {
    type: string;
    payload: boolean;
}

const initialValue: boolean = false;

export default function LoadReducer(
    state: boolean = initialValue,
    action: LoadingAction,
): boolean {
    switch(action.type){
        case SAVE:
            return action.payload;
        default:
            return state;
    }
}