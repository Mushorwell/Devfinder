import React, {Fragment} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppState} from "../../store/appState";
import IActivity from "../../Interfaces/IActivity";
import NotFound from "../Layout/NotFound/NotFoundComponent";

const ActivityView = () => {

    const { id }: { id: string } = useParams();

    const activity =useSelector((
        state: AppState
    ) => state.activities.find(
        activity => activity.id === id
    ));

    if (activity){
        const repoUrl = `https://github.com/${activity.repo}`

        return(
            <Fragment>
                <div className='containerDiv'>
                    <br/><br/>
                    These are the activity details:<br/>
                    <br/>
                    Timestamp: {activity.date}
                    <br/>
                    Activity Type: {activity.type}
                    <br/>
                    Activity Repo: {activity.repo}
                    <br/>
                    Repository: {activity.isPublic ? 'Public Repository': 'Private Repository'}
                    <br/>
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