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
import {searchUsers} from "../../Controllers/users.controller";
import {routes} from "../Layout/Body/Body";
import {SAVE as storeUserList} from "../../store/userListReducer";
import { useHistory } from 'react-router-dom';

interface ResultProps{
    searchVal: string;
    setSearchVal:  React.Dispatch<React.SetStateAction<string>>;
}

const ResultsList: FunctionComponent<ResultProps> = (
    { searchVal, setSearchVal }: ResultProps
) => {

    const dispatch = useDispatch();
    const history = useHistory();

    let users =useSelector((state: AppState) => state.userList);
    const inputElement= useRef<HTMLInputElement>(null);

    // set the state for filtered users
    const [filteredUsers, setFilteredUsers] = useState<Array<IUser>>(users);

    const submitSearchQuery: FormEventHandler<HTMLFormElement> = useCallback((
        searchValueEvent: FormEvent<HTMLFormElement>
    ) => {
        searchValueEvent.preventDefault();

        console.log(searchVal);

        searchUsers(searchVal).then(users => {

            // Check the number of search results
            switch (users.total_count){
                case 0:
                    break;
                default:
                    const usersFound: Array<IUser> = users.items.map(function(user: any){
                        return {
                            id: user.id,
                            username: user.login,
                            avatarUrl: user.avatar_url,
                            githubUrl: user.html_url,
                            eventsUrl: user.events_url,
                            reposUrl: user.repos_url,
                            textMatches: {
                                type: user.text_matches.property,
                                fragment: user.text_matches.fragment
                            },
                        };
                    });
                    dispatch({
                        type:storeUserList,
                        payload: usersFound
                    });
                    history.push(routes.ResultsList);
                    break;
                }
        });
    }, [dispatch, searchVal]);

    useEffect(() => {
        console.log('state updated');
    }, [searchVal, filteredUsers, submitSearchQuery]);

    const checkIfMatches = (
        element: IUser,
        filterBy: string
    ) => {
        return element.username.toLocaleLowerCase()
            .indexOf(filterBy) !== -1;
    }

    const filterList = (usersArray: Array<IUser>, filterBy: string) => {

        // if search bar has been cleared function returns full list
        if (filterBy !== ''){
            filterBy = filterBy.toLocaleLowerCase();

            return usersArray.filter((user) =>
                checkIfMatches(user, filterBy));
        }
        console.log('cleared search value');
        return usersArray;
    }

    // Function to handle the value change of searchVal
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
        filterResultsEvent: ChangeEvent<HTMLInputElement>
    ) =>  {
        let newUsers: Array<IUser> = [...users];
        setSearchVal(filterResultsEvent.target.value);
        setFilteredUsers(filterList(newUsers, searchVal));
    }

    return(
        <Fragment>
            <div className={styles.search}>
                <form onSubmit={submitSearchQuery} className={styles.searchBar}>
                    <input
                        id='searchString'
                        name='searchString'
                        type='text'
                        ref={inputElement}
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
                                profileId={index}
                                username={user.username}
                                gitHubUrl={user.githubUrl}
                                useravatar={user.avatarUrl || ''}
                            />
                        )
                        : 'Not found'}
                </div>
            </div>
        </Fragment>
    )
}

export default ResultsList;