import React, { Fragment } from 'react';
import styles from './NotFound.module.css';
import NotFoundComponent from "./NotFoundComponent";

const NotFound = () => {

    return(
        <Fragment>
            <div className={styles.notFoundPage}>
                <NotFoundComponent />
            </div>

        </Fragment>
    )
}

export default NotFound;