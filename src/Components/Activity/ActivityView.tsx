import React, {Fragment} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppState} from "../../store/appState";
import NotFound from "../Layout/NotFound/NotFoundComponent";
import UserHeader from "../User/UserHeader";

const ActivityView = () => {

    const { id }: { id: string } = useParams();

    const activity =useSelector((
        state: AppState
    ) => state.activities.find(
        activity => activity.id === id
    ));

    const user =useSelector((
        state: AppState
    ) => state.user);

    if (activity && user){
        const repoUrl = `https://github.com/${activity.repo}`;

        const date = new Date(activity.date);

        return(
            <Fragment>
                <UserHeader
                    githubUrl={user.githubUrl}
                    username={user.username}
                    avatarUrl={user.avatarUrl}
                />
                <div className='infoSection'>
                    <p>Activity Type: {activity.type}</p>
                    <p>Activity Repo: {activity.repo}</p>
                    <p>Repository: {activity.isPublic ?
                        'Public Repository'
                        : 'Private Repository'}</p>
                    <p>Timestamp: {date.toUTCString()}</p>
                    <a
                        className='navigationButton'
                        href={repoUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        View Repository
                    </a>
                </div>
            </Fragment>
        )
    }
    return <NotFound />
}

export default ActivityView;