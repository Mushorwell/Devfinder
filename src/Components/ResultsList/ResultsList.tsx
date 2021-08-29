import React, {
    Fragment, useEffect,
    useState,
} from 'react';
import styles from './ResultList.module.css';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/appState";
import IUser, {IUserList} from "../../Interfaces/IUser";
import ResultItem from "./ResultItem";
import LoaderPage from "../Shared/Loader/LoaderPage";
import SearchSection from "../Search/SearchSection";
import { SAVE as storeFilteredUser } from '../../store/filteredUsersReducer';

const ResultsList = () => {

    const filteredUsers: Array<IUser> =useSelector((state: AppState) => state.filteredUsers);
    const usersList: IUserList =useSelector((state: AppState) => state.userList);
    const loadingPage: boolean =useSelector((state: AppState) => state.loading);
    // const filteredUsers: Array<IUser> =useSelector((state: AppState) => state.userList.loadedUsers);
    // set the state for filtered users
    // const [filteredUsers, setFilteredUsers] = useState<Array<IUser>>(usersList.loadedUsers);
    const dispatch = useDispatch();
    dispatch({
        type: storeFilteredUser,
        payload: usersList.loadedUsers,
    });
    // const [loading, setLoading] = useState<boolean>(loadingPage);
    useEffect(() => {
        console.log(filteredUsers);
        console.log(loadingPage);
        console.log(usersList);
    }, [filteredUsers]);
    
    
    return(
        <Fragment>
            <SearchSection />
            <div className={styles.results}>
                    {loadingPage? <LoaderPage message='Loading Next Page...'/>: filteredUsers.length!==0?
                        filteredUsers.map((user: IUser, index: number) =>
                            <ResultItem
                                key={index}
                                profileId={user.id}
                                username={user.username}
                                gitHubUrl={user.githubUrl}
                                userAvatar={user.avatarUrl || ''}
                            />
                        ) : 'Not found'}
            </div>
        </Fragment>
    )
}

export default ResultsList;