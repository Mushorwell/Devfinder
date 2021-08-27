import React, {Fragment, FunctionComponent, MouseEventHandler} from 'react';
import styles from "./User.module.css";

interface UserHeaderProps{
    avatarUrl?: string;
    username: string;
    githubUrl: string;
}

const UserHeader: FunctionComponent<UserHeaderProps> = (
    {avatarUrl, username, githubUrl}: UserHeaderProps
) => {

    const saveUserToLocalDatabase: MouseEventHandler<HTMLButtonElement> = () => {
        // method for storing the user object to local database api
        // need to first get the user object instance from the redux store,
        // then use the makeApiCall method to send a post request to local server
    }

    return(
        <Fragment>
            <div className={[styles.profileDetails].join(' ')}>
                <img
                    className={styles.profileImage}
                    src={avatarUrl}
                    alt={username}
                />
                <div className={styles.userDetails}>
                    <h1 className={styles.profileName}>{username}</h1>
                    <a
                        className={styles.link}
                        href={githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'>Github Profile Link</a>
                </div>
                <button
                    className={styles.actionButton}
                    onClick={saveUserToLocalDatabase}
                >{`Save ${username}'s details`}</button>
            </div>
        </Fragment>
    );
}

export default UserHeader;