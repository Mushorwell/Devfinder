import { combineReducers } from 'redux';
import UserReducer from "./userReducer";
import UserListReducer from "./userListReducer";
import ActivityListReducer from "./activityListReducer";
import ActivityReducer from "./activityReducer";
import SearchReducer from "./searchReducer";
import LoadReducer from "./loadReducer";
import FilteredUsersReducer from "./filteredUsersReducer";

export const rootReducer = combineReducers({
    loading: LoadReducer,
    filteredUsers: FilteredUsersReducer,
    user: UserReducer,
    userList: UserListReducer,
    activities: ActivityListReducer,
    activity: ActivityReducer,
    search: SearchReducer,
});

export type AppState = ReturnType<typeof rootReducer>;