import React, {Fragment, useState, useEffect} from 'react';
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
                        const recentActions: Array<IActivity> = (activities.map(
                            (activity: any) => ({
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