import React , { Fragment } from 'react';
import ActivityListItem from "./ActivityListItem";
import {useSelector} from "react-redux";
import {AppState} from "../../store/appState";
import IActivity from "../../Interfaces/IActivity";

const ActivityList = () => {

    const activities: Array<IActivity> =useSelector(
        (state: AppState) => state.activities);

    return(
        <Fragment>
            {activities.length!==0 ?
            activities.map(
                (activity: IActivity, index: number) => <ActivityListItem
                    key={index}
                    activityId={activity.id}
                    activityType={activity.type}
                    repoName={activity.repo}
                    isPublic={activity.isPublic}
                    timeStamp={activity.date}
                />)
                : 'No recent activities'}
        </Fragment>
    )
}

export default ActivityList;
