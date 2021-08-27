import React from 'react';
import styles from './Footer.module.css';
import { AiFillFacebook, AiFillInstagram, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
    return(
        <div className={styles.footer}>
            <div className={styles.extraFooterSection}>
                <a href="https://www.facebook.com/"><AiFillFacebook color={'#282c34'} size={'40px'}/></a>
                <a href="https://github.com/Mushorwell"><AiFillGithub color={'#282c34'} size={'40px'}/></a>
                <a href="https://www.instagram.com/"><AiFillInstagram color={'#282c34'} size={'40px'}/></a>
                <a href="https://www.linkedin.com/in/orwell-tendaishe-mushaikwa-bb30647a/"><AiFillLinkedin color={'#282c34'} size={'40px'}/></a>
            </div>
            <div className={styles.copyright}>
                Copyright © Orwell Tendaishe Mushaikwa
            </div>
        </div>
    );
}

export default Footer;