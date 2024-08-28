import classNames from 'classnames/bind';
import styles from './SocialContact.scss';
import Button from '../../../../../components/Button';
// import { FacebookLogo,
//          DiscordLogo,
//          XLogo
//  } from '../../../../../assets/SocialContact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord,
         faFacebook,
         faTwitter } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const cx = classNames.bind(styles);

const SocialContact = ({ showSocialContact }) => {
    return (
        <div className={cx('social-contact-box', { active: showSocialContact })}>
            <div className={cx('header')}>
                <span className={cx('title')}>Social Contact</span>
            </div>
            <div className={cx('social-contact-line')}></div>
            <Button
                types="primary"
                className={cx('contact')}
                href="https://www.facebook.com/sibooksbookstore"
                target="_blank"
            >
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faFacebook}/> Facebook fanpage</p>
            </Button>
            <Button
                // class="btn btn-success"
                types="primary"
                className={cx('contact')}
                href="https://www.discord.gg/tFmw7XYEAu"
                target="_blank"
            >
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faDiscord}/> Discord group</p>
            </Button>
            <Button
                // class="btn btn-success"
                types="primary"
                className={cx('contact')}
                href="https://www.x.com/sibookstore"
                target="_blank"
            >
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faTwitter}/> Contact on Twitter</p>
            </Button>
        </div>
    );
};

export default SocialContact;
