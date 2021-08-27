import React, {FormEvent, FormEventHandler, Fragment, FunctionComponent, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Search.module.css';
import { MdSearch } from "react-icons/md";
import { searchUsers } from "../../Controllers/users.controller";
import { routes } from "../Layout/Body/Body";
import { useDispatch } from "react-redux";
import { SAVE as storeUserList } from '../../store/userListReducer';

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

    const submitSearchQuery: FormEventHandler<HTMLFormElement> = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // Get search data
        const { searchString } = event.target as typeof event.target & {
            searchString: { value: string}
        };

        await searchUsers(searchString.value).then(
            result => {

                dispatch({
                    type:storeUserList,
                    payload: result.loadedUsers
                });
                setSearchVal(searchString.value);
                history.push(routes.ResultsList);
            }
        );
    }

    return(
        <Fragment>
            <div className={styles.searchPage}>
                <h1>DEVFINDER</h1>
                <form onSubmit={async(submit: FormEvent<HTMLFormElement>) => await submitSearchQuery(submit)}>
                    <input id='searchString' name='searchString' type='text' ref={inputElement}/>
                    <button type='submit'><MdSearch size={'30px'}/></button>
                </form>
            </div>
        </Fragment>
    )
}

export default Search;