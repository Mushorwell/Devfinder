import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className={styles.navbar}>
            <Link to='/'>
                <div className={styles.homeLogo}>
                    DEVFINDER
                </div>
            </Link>
        </div>
    );
}

export default Header;

