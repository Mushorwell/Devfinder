import React, {
    Fragment,
    useState,
} from 'react';
import styles from './ResultList.module.css';
import { useSelector } from "react-redux";
import { AppState } from "../../store/appState";
import IUser, {IUserList} from "../../Interfaces/IUser";
import ResultItem from "./ResultItem";
import SearchBar from "../Search/SearchBar";
import LoaderView from "../LoaderView/LoaderView";
import SearchSection from "../Search/SearchSection";

const ResultsList = () => {

    const usersList: IUserList =useSelector((state: AppState) => state.userList);

    // set the state for filtered users
    const [filteredUsers, setFilteredUsers] = useState<Array<IUser>>(usersList.loadedUsers);
    const [loading, setLoading] = useState<boolean>(false);

    return(
        <Fragment>
            <SearchSection loading={loading} setFilteredUsers={setFilteredUsers} setLoading={setLoading} />
            <div className={styles.results}>
                <div>
                    {loading? <LoaderView message='Finding GitHub Users...'/>: filteredUsers.length!==0?
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
            </div>
        </Fragment>
    )
}

export default ResultsList;