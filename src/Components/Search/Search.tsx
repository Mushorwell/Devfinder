import React, {FormEvent, FormEventHandler, Fragment, useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Search.module.css';
import { MdSearch } from "react-icons/md";
import { searchUsers } from "../../Controllers/users.controller";
import { routes } from "../Layout/Body/Body";
import { useDispatch } from "react-redux";
import { SAVE as storeUserList } from '../../store/userListReducer';
import { SAVE as storeSearchString } from '../../store/searchReducer';
import LoaderPage from "../Shared/Loader/LoaderPage";

const Search = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const inputElement = useRef<HTMLInputElement>(null);

    const history = useHistory();

    useEffect(() => {
        // autofocus on search input element once element loaded
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, []);

    const executeSearch = async (searchVal: string) => {
        if (searchVal!==''){
            setLoading(true);
            console.log('Loading...', loading);
            await searchUsers(searchVal).then(
                result => {
                    if (result!==undefined){
                        dispatch({
                            type:storeUserList,
                            payload: result
                        });
                        dispatch({
                            type: storeSearchString,
                            payload: searchVal
                        });
                        setLoading(false);
                        console.log('Loading...', loading);
                        history.push(routes.ResultsList);
                    } else {
                        console.log(`Can't connect... try again later`);
                    }
                }
            );
        }
    }

    const submitSearchQuery: FormEventHandler<HTMLFormElement> = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // Get search data
        const { searchString } = event.target as typeof event.target & {
            searchString: { value: string}
        };

        await executeSearch(searchString.value);
    }

    return(
        <Fragment>
            {loading ?
                <LoaderPage message='Finding GitHub Users...'/> :
                <div className={styles.searchPage}>
                    <h1>DEVFINDER</h1>
                    <form onSubmit={async(submit: FormEvent<HTMLFormElement>) => await submitSearchQuery(submit)}>
                        <input id='searchString' name='searchString' type='text' ref={inputElement}/>
                        <button type='submit'><MdSearch size={'30px'}/></button>
                    </form>
                </div>
            }
        </Fragment>
    )
}

export default Search;