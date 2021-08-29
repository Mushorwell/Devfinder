import React, {
    ChangeEvent,
    ChangeEventHandler,
    Dispatch,
    FormEvent,
    FormEventHandler,
    FunctionComponent,
    SetStateAction,
    useCallback,
    useEffect,
    useRef, useState
} from 'react';
import { Fragment } from 'react';
import styles from "../ResultsList/ResultList.module.css";
import {MdSearch} from "react-icons/md";
import IUser, {IUserList} from "../../Interfaces/IUser";
import {searchUsers} from "../../Controllers/users.controller";
import {SAVE as storeUserList} from "../../store/userListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/appState";
import {SAVE as storeSearchString} from "../../store/searchReducer";
import {SAVE as storeLoadStatus} from '../../store/loadReducer';
import {SAVE as storeFilteredUsers} from '../../store/filteredUsersReducer';

interface ISearchBarProps{
    loading: boolean;
    setFilteredUsers: Dispatch<SetStateAction<IUser[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const SearchBar= () => {
    const filteredUsers: Array<IUser> =useSelector((state: AppState) => state.userList.loadedUsers);
    const searchVal: string = useSelector((state: AppState) => state.search);
    const usersList: IUserList = useSelector((state: AppState) => state.userList);
    const loading: boolean = useSelector((state: AppState) => state.loading);

    const storeDispatch = useDispatch();

    const searchBar= useRef<HTMLInputElement>(null);

    const [ searchString, setSearchString ] = useState(searchVal);

    useEffect(() => {

        if (searchBar.current) {
            searchBar.current.focus();
        }

        console.log('Autofocus on search bar');
    }, []);

    type ActionType = string;
    type ActionPayload = IUserList | string | boolean | Array<IUser>;

    const dispatchReduxAction = useCallback((type: ActionType, payload: ActionPayload) => {
        storeDispatch({
            type:type,
            payload: payload
        });
        console.log('Updating state using action:', type);
    }, [storeDispatch])

    const executeSearch = useCallback(async (searchVal: string, pageNo: number = 1) => {
        if(searchVal!==''){
            dispatchReduxAction(storeLoadStatus, true);
            console.log('Loading...', loading);
            await searchUsers(searchVal, pageNo).then(
                result => {
                    if (result !== undefined){
                    dispatchReduxAction(storeUserList, result);
                    dispatchReduxAction(storeSearchString, searchVal);
                    dispatchReduxAction(storeFilteredUsers, result.loadedUsers);
                    dispatchReduxAction(storeLoadStatus, false);
                    console.log('Loading...', loading);
                    }else{
                        console.log(`Can't connect... try again later`);
                    }
                }
            );
        }
    }, [dispatchReduxAction, filteredUsers, loading]);

    const submitSearchQuery: FormEventHandler<HTMLFormElement> = useCallback(
        async (searchValueEvent: FormEvent<HTMLFormElement>
    ) => {
        searchValueEvent.preventDefault();

        console.log(searchString);

        await executeSearch(searchString);
    }, [executeSearch, searchString]);

    const checkIfMatches = (
        element: IUser,
        filterBy: string
    ) => {
        return element.username.toLocaleLowerCase()
            .indexOf(filterBy) !== -1;
    }

    const filterList = useCallback(
        (usersArray: Array<IUser>, filterBy: string) => {

        // if search bar has been cleared function returns full list
        if (filterBy !== ''){
            filterBy = filterBy.toLocaleLowerCase();
            console.log('Filtered list');
            return usersArray.filter(
                (user) => checkIfMatches(user, filterBy)
            );
        }
        console.log('cleared search value');
        return usersArray;
    },[]);

    // Function to handle the value change of search string
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((
        filterResultsEvent: ChangeEvent<HTMLInputElement>
    ) =>  {
        let newUsers: Array<IUser> = [...usersList.loadedUsers];
        setSearchString(filterResultsEvent.target.value);
        dispatchReduxAction(storeFilteredUsers, filterList(newUsers, filterResultsEvent.target.value));
    }, [dispatchReduxAction, filterList, usersList.loadedUsers]);

    return (
        <Fragment>
            <form onSubmit={submitSearchQuery} className={styles.searchBar}>
                <input
                    id='searchString'
                    name='searchString'
                    type='text'
                    ref={searchBar}
                    value={searchString}
                    onChange={handleInputChange}
                />
                <button type='submit'><MdSearch size={'30px'}/></button>
            </form>
        </Fragment>
    );
}

export default SearchBar;