import React, {Fragment, useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {AppState} from "../../store/appState";
import IUser from "../../Interfaces/IUser";
import { SAVE as saveUser } from "../../store/userReducer";
import { searchRecentActivities } from '../../Controllers/activities.controller';
import IActivity from "../../Interfaces/IActivity";
import { SAVE as storeUserActivities } from '../../store/activityListReducer';
import NotFoundComponent from "../Layout/NotFound/NotFoundComponent";
import UserHeader from "./UserHeader";
import styles from "./User.module.css";
import ActivityList from "../Activity/ActivityList";

const User = () => {

    const { id }: { id: string } = useParams();

    const user =useSelector((
        state: AppState
    ) => state.userList.loadedUsers.find(
        user => user.id === Number(id)
    ));

    const [loading, setLoading] = useState<boolean>(true);
    const [profile] = useState<IUser | undefined>(user);

    const dispatch = useDispatch();

    type ActionType = string;
    type ActionPayload = Array<IActivity>;
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

    const loadUserActivityData = () => {
        console.log('Loading...', loading);
        if (user) {
            dispatch({
                type: saveUser,
                payload: profile
            });

            searchRecentActivities(user.username).then(activities => {

                switch (activities.length) {
                    case 0:
                        // setLoading(false);
                        break;
                    default:
                        const recentActions: Array<IActivity> = (activities.map(
                            (activity: any) => ({
                                id: activity.id,
                                type: activity.type,
                                repo: activity.repo.name,
                                isPublic: activity.public,
                                date: activity.created_at
                            })
                        ));
                        dispatchReduxAction(storeUserActivities, recentActions);
                        setLoading(false);
                        console.log('Loading...', loading);
                        break;
                }
            });
        }
    }

    useEffect(()=> {

        loadUserActivityData();

    });
    return(
        <Fragment>
            {profile ?
                <Fragment>
                    <UserHeader
                        avatarUrl={profile.avatarUrl}
                        githubUrl={profile.githubUrl}
                        username={profile.username}
                    />
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