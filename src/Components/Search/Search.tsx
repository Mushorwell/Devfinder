import React, {FormEvent, FormEventHandler, Fragment, useCallback, useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Search.module.css';
import { MdSearch } from "react-icons/md";
import { searchUsers } from "../../Controllers/users.controller";
import { routes } from "../Layout/Body/Body";
import { useDispatch } from "react-redux";
import { SAVE as storeUserList } from '../../store/userListReducer';
import { SAVE as storeSearchString } from '../../store/searchReducer';
import LoaderView from "../LoaderView/LoaderView";
import IUser, {IUserList} from "../../Interfaces/IUser";
import useAutoFocus from "../Shared/useAutoFocus";

type ActionType = string;
type ActionPayload = IUserList | string | boolean | Array<IUser>;

const Search = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const inputElement = useRef<HTMLInputElement>(null);

    const history = useHistory();

    useAutoFocus(inputElement);

    const dispatchReduxAction = useCallback(
        (
            type: ActionType, payload: ActionPayload
        ) => {
        dispatch({
            type:type,
            payload: payload
        });
        console.log('Updating state using action:', type);
    }, [dispatch]);

    const onUserSearch = (result: IUserList | undefined, searchVal='') => {
        if (result){
            dispatchReduxAction(storeUserList, result);
            dispatchReduxAction(storeSearchString, searchVal);
            setLoading(false);
            console.log('Loading...', loading);
            history.push(routes.ResultsList);
        }
    }

    const executeSearch = async (searchVal: string) => {
        setLoading(true);
        console.log('Loading...', loading);
        await searchUsers(searchVal).then(
            result => {
                onUserSearch(result, searchVal);
            }
        );
    }

    const submitUserSearchQuery: FormEventHandler<HTMLFormElement> = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // Get search data
        const { searchString } = event.target as typeof event.target & {
            searchString: { value: string}
        };

        await executeSearch(searchString.value);
        // await useSearchUsers(searchString);
    }

    return(
        <Fragment>
            {loading ?
                <LoaderView message='Finding GitHub Users...'/> :
                <div className={styles.searchPage}>
                    <h1>DEVFINDER</h1>
                    <form onSubmit={async(submit: FormEvent<HTMLFormElement>) => await submitUserSearchQuery(submit)}>
                        <input id='searchString' name='searchString' type='text' ref={inputElement}/>
                        <button type='submit'><MdSearch size={'30px'}/></button>
                    </form>
                </div>
            }
        </Fragment>
    )
}

export default Search;