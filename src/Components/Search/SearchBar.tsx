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

interface ISearchBarProps{
    loading: boolean;
    setFilteredUsers: Dispatch<SetStateAction<IUser[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const SearchBar: FunctionComponent<ISearchBarProps> = (
    { loading, setFilteredUsers, setLoading }: ISearchBarProps
) => {

    const searchVal: string = useSelector((state: AppState) => state.search);
    const usersList: IUserList = useSelector((state: AppState) => state.userList);

    const storeDispatch = useDispatch();

    const searchBar= useRef<HTMLInputElement>(null);

    const [ searchString, setSearchString ] = useState(searchVal);

    useEffect(() => {

        if (searchBar.current) {
            searchBar.current.focus();
        }

        console.log('state updated');
    }, []);



    const executeSearch = useCallback(async (searchVal: string, pageNo: number = 1) => {
        setLoading(true);
        console.log('Loading...', loading);
        await searchUsers(searchVal, pageNo).then(
            result => {
                if (result){
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
                    setFilteredUsers(result.loadedUsers);
                }
            }

        );

    }, [loading, setFilteredUsers, setLoading, storeDispatch]);

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
        setFilteredUsers(filterList(newUsers, filterResultsEvent.target.value));
    }, [filterList, setFilteredUsers, usersList.loadedUsers]);

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