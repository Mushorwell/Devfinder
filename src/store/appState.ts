import { combineReducers } from 'redux';
import UserReducer from "./userReducer";
import UserListReducer from "./userListReducer";
import ActivityListReducer from "./activityListReducer";
import ActivityReducer from "./activityReducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    userList: UserListReducer,
    activities: ActivityListReducer,
    activity: ActivityReducer,
});

export type AppState = ReturnType<typeof rootReducer>;