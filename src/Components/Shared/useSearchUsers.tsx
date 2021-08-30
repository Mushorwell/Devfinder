import { useHistory, useLocation} from "react-router-dom";
import { useCallback, useState} from "react";
import IUser, {IUserList} from "../../Interfaces/IUser";
import {searchUsers} from "../../Controllers/users.controller";
import {SAVE as storeUserList} from "../../store/userListReducer";
import {SAVE as storeSearchString} from "../../store/searchReducer";
import {SAVE as storeLoadStatus} from '../../store/loadReducer';
import {useDispatch, useSelector} from "react-redux";
import {routes} from "../Layout/Body/Body";
import {AppState} from "../../store/appState";

// export interface ISearchUserHookParams{
//     loading: boolean
//     pageNo?:number;
//     searchVal: string;
//     setFilteredUsers?: Dispatch<SetStateAction<IUser[]>>;
//     setLoading: Dispatch<SetStateAction<boolean>>;
// }

//{loading, searchVal, setFilteredUsers, setLoading, pageNo = 1}: ISearchUserHookParams

type ActionType = string;
type ActionPayload = IUserList | string | boolean | Array<IUser>;

export default async function useSearchUsers( searchVal: string, pageNo: number = 1 ){

    const storeDispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const usersList: IUserList = useSelector((state: AppState) => state.userList);
    const loading: boolean = useSelector((state: AppState) => state.loading);

    const [filteredUsers, setFilteredUsers] = useState(() =>{
        if (usersList){
            return usersList.loadedUsers?usersList.loadedUsers:[];
        }
        return [];
    });

    const dispatchReduxAction = useCallback((type: ActionType, payload: ActionPayload) => {
        storeDispatch({
            type:type,
            payload: payload
        });
        console.log('Updating state using action:', type);
    }, [storeDispatch])

    console.log(location);

    // setLoading(true);
    dispatchReduxAction(storeLoadStatus, true);
    console.log('Loading...', loading);

    const onUserSearchResponse = (result: IUserList | undefined, searchVal: string='') =>{
        if (result){
            dispatchReduxAction(storeUserList, result);
            dispatchReduxAction(storeSearchString, searchVal);

            if (location.pathname===routes.Home){
                history.push(routes.ResultsList);
                console.log('Redirecting to:' ,location)
            }

            setFilteredUsers(result.loadedUsers);

            // setLoading(false);
            dispatchReduxAction(storeLoadStatus, false);
            console.log('Loading...', loading);

        }else{
            console.log(`Can't connect... try again later`);
        }
    }

    await searchUsers(searchVal, pageNo).then(
        result => {
            onUserSearchResponse(result, searchVal);
        }
    );
    return [filteredUsers, setFilteredUsers];
}



