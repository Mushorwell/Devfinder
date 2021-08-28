export const SAVE = 'SAVE_SEARCH_STRING';

export interface searchAction {
    type: string;
    payload: string;
}

export default function SearchReducer (
    state: string = '',
    action: searchAction
): string {
    switch (action.type){
        case SAVE:
            return action.payload;
        default:
            return state;
    }
}