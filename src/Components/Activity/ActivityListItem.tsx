import React, {Fragment, FunctionComponent} from 'react';
import styles from './Activity.module.css';

interface ActivityListProps{
    activityType:string
    repoName:string
    isPublic:boolean
    timeStamp:string
}

const ActivityListItem: FunctionComponent<ActivityListProps> = (
    { activityType, repoName, isPublic, timeStamp }: ActivityListProps
) => {
    return(
        <Fragment>
            <div className={styles.activityItem}>
                <h1>Event Type: {activityType}</h1>
                <p>Repo name: {repoName}</p>
                <p>Public: {isPublic}</p>
                <p>Timestamp: {timeStamp}</p>
            </div>
        </Fragment>
    )
}

export default ActivityListItem;