import React, {FormEvent, FormEventHandler, Fragment, FunctionComponent, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Search.module.css';
import { MdSearch } from "react-icons/md";
import { searchUsers } from "../../Controllers/users.controller";
import { routes } from "../Layout/Body/Body";
import { useDispatch } from "react-redux";
import { SAVE as storeUserList } from '../../store/userListReducer';
import IUser from "../../Interfaces/IUser";

interface SearchProps{
    searchVal?: string;
    setSearchVal:  React.Dispatch<React.SetStateAction<string>>;
}
const Search: FunctionComponent<SearchProps> = ({ searchVal, setSearchVal }: SearchProps) => {

    const dispatch = useDispatch();

    const inputElement = useRef<HTMLInputElement>(null);

    const history = useHistory();

    useEffect(() => {
        // autofocus on search input element once element loaded
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, []);

    const submitSearchQuery: FormEventHandler<HTMLFormElement> = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // Get search data
        const { searchString } = event.target as typeof event.target & {
            searchString: { value: string}
        };

        searchUsers(searchString.value).then(users => {

            // set the state tp searcj va;lue
            setSearchVal(searchString.value);


            // Check the number of search results
            switch (users.total_count){
                case 0:
                    history.push(routes.Home);
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
    }

    return(
        <Fragment>
            <div className={styles.searchPage}>
                <h1>DEVFINDER</h1>
                <form onSubmit={submitSearchQuery}>
                    <input id='searchString' name='searchString' type='text' ref={inputElement}/>
                    <button type='submit'><MdSearch size={'30px'}/></button>
                </form>
            </div>
        </Fragment>
    )
}

export default Search;