import React, {Fragment, useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppState} from "../../store/appState";
import NotFound from "../Shared/NotFound/NotFoundComponent";
import UserHeader from "../User/UserHeader";
import LoaderPage from "../Shared/Loader/LoaderPage";

const ActivityView = () => {

    const { id }: { id: string } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    console.log('Loading:', loading);

    const activity =useSelector((
        state: AppState
    ) => state.activities.find(
        activity => activity.id === id
    ));

    const user =useSelector((
        state: AppState
    ) => state.user);


    console.log('Loading:', loading);

    if (activity && user){
        // setLoading(true);
        const repoUrl = `https://github.com/${activity.repo}`;

        const date = new Date(activity.date);
        // setLoading(false);

        return(
            <Fragment>
                <UserHeader
                    githubUrl={user.githubUrl}
                    username={user.username}
                    avatarUrl={user.avatarUrl}
                />
                { loading ? <LoaderPage message='Getting Activity Details...'/> :
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
                }
            </Fragment>
        )
    }
    return <NotFound />;
}

export default ActivityView;