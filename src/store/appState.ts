import { combineReducers } from 'redux';
import UserReducer from "./userReducer";
import UserListReducer from "./userListReducer";
import ActivityListReducer from "./activityListReducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    userList: UserListReducer,
    activities: ActivityListReducer
});

export type AppState = ReturnType<typeof rootReducer>;