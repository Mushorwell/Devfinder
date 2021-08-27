import React, {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    FormEventHandler,
    Fragment,
    FunctionComponent,
    useRef, useState,
    useEffect, useCallback
} from 'react';
import styles from './ResultList.module.css';
import { MdSearch } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/appState";
import IUser from "../../Interfaces/IUser";
import ResultItem from "./ResultItem";
import { searchUsers } from "../../Controllers/users.controller";
import {SAVE as storeUserList} from "../../store/userListReducer";

interface ResultProps{
    searchVal: string;
    setSearchVal:  React.Dispatch<React.SetStateAction<string>>;
}

const ResultsList: FunctionComponent<ResultProps> = (
    { searchVal, setSearchVal }: ResultProps
) => {

    const dispatch = useDispatch();

    let users =useSelector((state: AppState) => state.userList);
    const searchBar= useRef<HTMLInputElement>(null);

    // set the state for filtered users
    const [filteredUsers, setFilteredUsers] = useState<Array<IUser>>(users);

    useEffect(() => {
        console.log(searchBar.current);
        if (searchBar.current) {
            searchBar.current.focus();
        }

        console.log('state updated');
    }, [searchVal, filteredUsers]);

    const checkIfMatches = (
        element: IUser,
        filterBy: string
    ) => {
        return element.username.toLocaleLowerCase()
            .indexOf(filterBy) !== -1;
    }

    const filterList = useCallback((usersArray: Array<IUser>, filterBy: string) => {

        // if search bar has been cleared function returns full list
        if (filterBy !== ''){
            filterBy = filterBy.toLocaleLowerCase();
            console.log('Filtered list');
            return usersArray.filter((user) =>
                checkIfMatches(user, filterBy));
        }
        console.log('cleared search value');
        return usersArray;
    },[]);

    const submitSearchQuery: FormEventHandler<HTMLFormElement> = (
        searchValueEvent: FormEvent<HTMLFormElement>
    ) => {
        searchValueEvent.preventDefault();

        console.log(searchVal);

        searchUsers(searchVal, 5).then(searchResults => {
            // store the results
            dispatch({
                type:storeUserList,
                payload: searchResults.loadedUsers
            });
            setFilteredUsers(searchResults.loadedUsers)
            // history.push(routes.ResultsList);
        });
    }

    // Function to handle the value change of searchVal
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((
        filterResultsEvent: ChangeEvent<HTMLInputElement>
    ) =>  {
        let newUsers: Array<IUser> = [...users];
        setSearchVal(filterResultsEvent.target.value);
        setFilteredUsers(filterList(newUsers, filterResultsEvent.target.value));
    }, [filterList, setSearchVal, users])

    return(
        <Fragment>
            <div className={styles.search}>
                <form onSubmit={submitSearchQuery} className={styles.searchBar}>
                    <input
                        id='searchString'
                        name='searchString'
                        type='text'
                        ref={searchBar}
                        value={searchVal}
                        onChange={handleInputChange}
                    />
                    <button type='submit'><MdSearch size={'30px'}/></button>
                </form>
            </div>
            <div className={styles.results}>
                <div>
                    {filteredUsers.length!==0?
                        filteredUsers.map((user: IUser, index: number) =>
                            <ResultItem
                                key={index}
                                profileId={user.id}
                                username={user.username}
                                gitHubUrl={user.githubUrl}
                                userAvatar={user.avatarUrl || ''}
                            />
                        )
                        : 'Not found'}
                </div>
            </div>
        </Fragment>
    )
}

export default ResultsList;