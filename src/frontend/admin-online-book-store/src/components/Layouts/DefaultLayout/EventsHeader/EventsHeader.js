import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSquareShareNodes,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import styles from './EventsHeader.scss';
import Button from '../../../../components/Button';
import Image from '../../../../components/Image';
import Menu from '../../../../components/Menu';
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

    return (
        <header className={cx('wrapper-header')}>
            <div className={cx('container-header')}>
                <Button
                    // class="btn btn-success"
                    className={cx('new-event')}
                    types="primary"
                    // onClick={handleShowSocialContact}
                >
                    <p>New</p>
                </Button>
                <div className={cx('search-bar')}>
                    <Search />
                </div>
            </div>
        </header>
    );
};

export default Header;
