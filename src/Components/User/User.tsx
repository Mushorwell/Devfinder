import React, {Fragment, useState, useEffect, useRef} from 'react';
import styles from './User.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {AppState} from "../../store/appState";
import IUser from "../../Interfaces/IUser";
import { SAVE as saveUser } from "../../store/userReducer";
import { searchRecentActivities } from '../../Controllers/activities.controller';
import { routes } from "../Layout/Body/Body";
import IActivity from "../../Interfaces/IActivity";
import ActivityList from "../Activity/ActivityList";
import { SAVE as storeUserActivities } from '../../store/activityListReducer';
import NotFoundComponent from "../Layout/NotFound/NotFoundComponent";

const User = () => {

    const { id }: { id: string } = useParams();

    const user =useSelector((
        state: AppState
    ) => state.userList.find(
        user => user.id === Number(id)
    ));

    const [profile] = useState<IUser | undefined>(user);

    const dispatch = useDispatch();

    useEffect(()=> {

        if (user){
            dispatch({
                type: saveUser,
                payload: profile
            });

            searchRecentActivities(user.username).then(activities => {

                switch (activities.length){
                    case 0:
                        break;
                    default:
                        const recentActions: Array<IActivity> = (activities.map((activity: any) => ({
                                id: activity.id,
                                type: activity.type,
                                repo: activity.repo.name,
                                isPublic: activity.public,
                                date: activity.created_at
                            })
                        ));
                        dispatch({
                            type:storeUserActivities,
                            payload: recentActions
                        });
                        console.log(activities.length);
                        break;
                }
            });
        }
    });
    return(
        <Fragment>
            {user ?
                <Fragment>
                    <div className={[styles.profileDetails].join(' ')}>
                        <img className={styles.profileImage} src={profile? profile.avatarUrl : ''} alt={profile? profile.username : ''}/>
                        <div className={styles.userDetails}>
                            <h1 className={styles.profileName}>{profile ? profile.username : ''}</h1>
                            <a
                                className={styles.link}
                                href={profile? profile.githubUrl : ''}
                                target='_blank'
                                rel='noopener noreferrer'>Github Profile Link</a>
                        </div>
                        <button
                            className={styles.actionButton}
                        >{`Save ${profile ? profile.username : ''}'s details`}</button>
                    </div>
                    <div className={styles.activities}>
                        <ActivityList/>
                    </div>
                </Fragment> :
                <div className='containerDiv'>
                    <NotFoundComponent />
                </div>
            }
        </Fragment>
    )
}

export default User;