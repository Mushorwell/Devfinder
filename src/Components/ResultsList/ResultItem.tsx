import React, {
    Fragment,
    FunctionComponent,
    MouseEvent,
    MouseEventHandler,
    PropsWithChildren
} from 'react';
import styles from './ResultList.module.css';
import { useHistory } from "react-router-dom";

interface ResultItemProps{
    profileId:number
    useravatar: string,
    username: string,
    gitHubUrl: string,
}
const ResultItem: FunctionComponent<ResultItemProps> = (
    props: PropsWithChildren<ResultItemProps>
) => {

    const history = useHistory();

    const handleClick: MouseEventHandler<HTMLButtonElement> = (
        viewActivities: MouseEvent<HTMLButtonElement>
    ) => {
        console.log(props.profileId);
        history.push(`/users/${props.profileId}`);
    }

    return(
        <Fragment>
            <div className={styles.resultItem}>
                <img src={props.useravatar} alt={props.username}/>
                <div className={styles.userDetails}>
                    <h1>Username: {props.username}</h1>
                    <a
                        href={props.gitHubUrl}
                        target='_blank'
                        rel='noopener noreferrer'>Github Profile Link</a><br/>
                    <button
                    onClick={handleClick}
                    id={JSON.stringify(props.profileId)}
                    >{`View ${props.username}'s activities`}</button>
                </div>
            </div>
        </Fragment>
    )
}
export default ResultItem;