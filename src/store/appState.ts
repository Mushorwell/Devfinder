import { combineReducers } from 'redux';
import UserReducer from "./userReducer";
import UserListReducer from "./userListReducer";
import ActivityListReducer from "./activityListReducer";
import ActivityReducer from "./activityReducer";
import SearchReducer from "./searchReducer";
import LoadReducer from "./loadReducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    userList: UserListReducer,
    activities: ActivityListReducer,
    activity: ActivityReducer,
    search: SearchReducer,
    loading: LoadReducer,
});

export type AppState = ReturnType<typeof rootReducer>;