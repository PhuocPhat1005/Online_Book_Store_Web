import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSquareShareNodes,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import styles from './Header.module.scss';
import Button from '../../../../components/Button';
import Image from '../../../../components/Image';
import Menu from '../../../../components/Menu';
import SocialContact from './SocialContact';
import config from '../../../../config';
import assets from '../../../../assets/';
import Search from '../../../../components/Search';

const cx = classNames.bind(styles);

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Profile',
        to: config.routes.profile,
    },
];

const Header = ({ admin }) => {
    const [showSocialContact, setShowSocialContact] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        console.log(123);

        navigate(config.routes.signin);
    };

    const handleNavigate = (route) => {
        if (admin) {
            navigate(route);
        }
    };

    const handleShowSocialContact = () => {
        setShowSocialContact(!showSocialContact);
    };


    return (
        <header className={cx('header-wrapper')}>
            <div className={cx('container')}>
                <div className={cx('search-bar')}>
                    <Search />
                </div>
                <Button
                    // class="btn btn-success"
                    className={cx('social-contact')}
                    types="primary1"
                    onClick={handleShowSocialContact}
                    title="Social Contact"
                >
                    <p><FontAwesomeIcon icon={faSquareShareNodes}/></p>
                    <SocialContact showSocialContact={showSocialContact} />
                </Button>
                {/* <div> */}
                    {/* <Menu items={USER_MENU} onSignOut={handleSignOut}> */}
                        {/* <Button className={cx('user')}> */}
                        <Button className={cx('user')}>
                            <Image className={cx('avatar')} src={assets.default_avartar} alt="" />
                            {/* <p className={cx('name')}>John</p> */}
                            <span className={cx('name')}>John</span>
                        </Button>
                    {/* </Menu> */}
                {/* </div> */}
            </div>
        </header>
    );
};

export default Header;
