import React, {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    FormEventHandler,
    Fragment,
    FunctionComponent,
    useRef, useState,
    useEffect
} from 'react';
import styles from './ResultList.module.css';
import { MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { AppState } from "../../store/appState";
import IUser from "../../Interfaces/IUser";
import ResultItem from "./ResultItem";

interface ResultProps{
    searchVal: string;
    setSearchVal:  React.Dispatch<React.SetStateAction<string>>;
}
const ResultsList: FunctionComponent<ResultProps> = (
    { searchVal, setSearchVal }: ResultProps
) => {

    const users =useSelector((state: AppState) => state.userList);
    const inputElement= useRef<HTMLInputElement>(null);

    // set the state for filtered users
    const [filteredUsers, setFilteredUsers] = useState<Array<IUser>>(users);

    useEffect(() => {
        console.log('state updated');
    }, [filteredUsers]);

    const checkIfMatches = (
        element: IUser,
        filterBy: string
    ) => {
        return element.username.toLocaleLowerCase()
            .indexOf(filterBy) !== -1;
    }

    const filterList = (filterBy: string) => {

        // if search bar has been cleared function returns full list
        if (filterBy !== ''){
            filterBy = filterBy.toLocaleLowerCase();

            return filteredUsers.filter((user) =>
                checkIfMatches(user, filterBy));
        }
        console.log('cleared search value');
        return users;
    }

    // Function to handle the value change of searchVal
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
        filterResultsEvent: ChangeEvent<HTMLInputElement>
    ) =>  {
        setSearchVal(filterResultsEvent.target.value);
        setFilteredUsers(filterList(searchVal));
    }

    const submitSearchQuery: FormEventHandler<HTMLFormElement> = (
        searchValueEvent: FormEvent<HTMLFormElement>
    ) => {
        searchValueEvent.preventDefault();

        console.log(searchVal);
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