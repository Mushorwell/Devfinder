import {useHistory, useLocation} from "react-router-dom";
import {Dispatch, SetStateAction} from "react";
import IUser from "../../Interfaces/IUser";
import {searchUsers} from "../../Controllers/users.controller";
import {SAVE as storeUserList} from "../../store/userListReducer";
import {SAVE as storeSearchString} from "../../store/searchReducer";
import {useDispatch} from "react-redux";
import {routes} from "../Layout/Body/Body";

export interface ISearchUserHookParams{
    loading: boolean
    pageNo?:number;
    searchVal: string;
    setFilteredUsers?: Dispatch<SetStateAction<IUser[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export async function useSearchUsers({loading, searchVal, setFilteredUsers, setLoading, pageNo = 1}: ISearchUserHookParams ){

    const storeDispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    console.log(location);

    await searchUsers(searchVal, pageNo).then(
        result => {
            storeDispatch({
                type:storeUserList,
                payload: result
            });
            storeDispatch({
                type: storeSearchString,
                payload: searchVal
            });
            setLoading(false);
            console.log('Loading...', loading);
            if (location.pathname===routes.Home){
                history.push(routes.ResultsList);
            }
            if (location.pathname===routes.ResultsList){
                if (setFilteredUsers) setFilteredUsers(result.loadedUsers);
            }
        }
    );
    return "OK";
}



