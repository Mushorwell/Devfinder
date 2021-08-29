import React, {Fragment, FunctionComponent} from 'react';
import Loader from "react-loader-spinner";
import styles from './Loader.module.css';
interface ILoaderPageProp{
    message: string
}
const LoaderPage: FunctionComponent<ILoaderPageProp> = ({message}: ILoaderPageProp) => {
    return(
        <Fragment>
            <div className={styles.loaderPage}>
                <Loader
                    type='Circles'
                    height={150}
                    width={150}
                    color='rgba(17,17,60,1)'
                    secondaryColor='rgba(81,76,167,1)'
                />
                <h1 className={styles.loadingText}>{message}</h1>
            </div>
        </Fragment>
    )
}

export default LoaderPage;