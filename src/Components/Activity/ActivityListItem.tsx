import React, {Fragment, FunctionComponent, MouseEvent, MouseEventHandler} from 'react';
import styles from './Activity.module.css';
import { useHistory } from 'react-router-dom';
import { routes, getExactRoute } from "../Layout/Body/Body";

interface ActivityListProps{
    activityId:string;
    activityType:string;
    repoName:string;
    isPublic:boolean;
    timeStamp:string;
}

const ActivityListItem: FunctionComponent<ActivityListProps> = (
    { activityId, activityType, repoName, isPublic, timeStamp }: ActivityListProps
) => {

    const history = useHistory();

    const handleClick: MouseEventHandler<HTMLButtonElement> = (
        viewActivity: MouseEvent<HTMLButtonElement>
    ) => {
        console.log(activityId);
        history.push(getExactRoute(routes.ActivityTemplate, activityId));
    }

    const date = new Date(timeStamp);

    return(
        <Fragment>
            <div className={styles.activityItem}>
                <h1>Event Type: {activityType}</h1>
                <p>Repo name: {repoName}</p>
                <p>Public: {isPublic ?
                    'Public Repository'
                    : 'Private Repository'}</p>
                <p>Timestamp: {date.toUTCString()}</p>
                <button className='navigationButton' onClick={handleClick}>
                    View Activity Details
                </button>
            </div>
        </Fragment>
    )
}

export default ActivityListItem;