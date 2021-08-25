import React from 'react';
import styles from './Footer.module.css';
import { AiFillFacebook, AiFillInstagram, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
    return(
        <div className={styles.footer}>
            <div className={styles.extraFooterSection}>
                <a href="#"><AiFillFacebook color={'#282c34'} size={'40px'}/></a>
                <a href="#"><AiFillGithub color={'#282c34'} size={'40px'}/></a>
                <a href="#"><AiFillInstagram color={'#282c34'} size={'40px'}/></a>
                <a href="#"><AiFillLinkedin color={'#282c34'} size={'40px'}/></a>
            </div>
            <div className={styles.copyright}>
                Copyright © Orwell Tendaishe Mushaikwa
            </div>
        </div>
    );
}

export default Footer;