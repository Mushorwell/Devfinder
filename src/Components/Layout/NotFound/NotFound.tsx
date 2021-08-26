import React, { Fragment } from 'react';
import styles from './NotFound.module.css';
import NotFoundImg from '../../../images/NotFound.jpg';
import { routes } from "../Body/Body";

const NotFound = () => {

    return(
        <Fragment>
            <div className={styles.notFoundPage}>
                <div className={styles.infoSection}>
                    <img className={styles.notFoundImage} src={NotFoundImg} alt='Not found by vectorjuice'/>
                    <a
                        href='https://www.freepik.com/vectors/templates'
                        target='_blank'
                        rel='noopener noreferrer'
                    >Template vector created by vectorjuice - www.freepik.com</a>
                    <a className={styles.navigationButton}
                        href={routes.Home}
                    >
                        Back to Search
                    </a>
                </div>
            </div>

        </Fragment>
    )
}

export default NotFound;