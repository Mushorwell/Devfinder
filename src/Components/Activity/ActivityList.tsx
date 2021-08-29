import React , { Fragment } from 'react';
import ActivityListItem from "./ActivityListItem";
import {useSelector} from "react-redux";
import {AppState} from "../../store/appState";
import IActivity from "../../Interfaces/IActivity";
import LoaderPage from "../Shared/Loader/LoaderPage";
import styles from "../User/User.module.css";
import '../../App.css';

interface IActivityListProps{
    loading: boolean
}
const ActivityList = ({loading}:IActivityListProps) => {

    const activities: Array<IActivity> =useSelector(
        (state: AppState) => state.activities);

    return(
        <Fragment>
            {loading ?
                <div className='containerDiv'>
                    <LoaderPage message='Loading User Details...'/>
                </div>
                : activities.length!==0 ?
                    <div className={styles.activities}>
                    {activities.map(
                    (
                        activity: IActivity, index: number
                    ) =>
                        <ActivityListItem
                        key={index}
                        activityId={activity.id}
                        activityType={activity.type}
                        repoName={activity.repo}
                        isPublic={activity.isPublic}
                        timeStamp={activity.date}
                    />)}
                    </div>
                : 'No recent activities'}
        </Fragment>
    )
}

export default ActivityList;
