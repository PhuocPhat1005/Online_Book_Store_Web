import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faDashboard,
    faBell,
    faCalendar,
    faBook,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import styles from './SideBar.scss';
import Button from '../../../../components/Button';
import Notification from '../../../../components/Notification';
import config from '../../../../config';
import assets from '../../../../assets/';
const cx = classNames.bind(styles);

const ADMIN_MENU = [
    {
        icon: <FontAwesomeIcon icon={faDashboard} />,
        title: 'Dashboards',
        to: config.routes.dashboards,
    },
    {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: 'Events',
        to: config.routes.events,
    },
    {
        icon: <FontAwesomeIcon icon={faBook} />,
        title: 'Book Settings',
        to: config.routes.bookSettings,
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Order Settings',
        to: config.routes.orderSettings,
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'User Management',
        to: config.routes.userManagement,
    },
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Sign out',
        to: config.routes.signin,
    },
];

const SideBar = ({ admin }) => {
    const [showNotification, setShowNotification] = useState(false);
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

    const handleShowNotification = () => {
        setShowNotification(!showNotification);
    };

    return (
        <header className={cx('side-bar-space')}>
            <img className={cx('logo')} src={assets.logo} alt="logo" />
            <div className={cx('website-name')}>SIBOOKS WEB</div>
            <div className={cx('menu-box')}>
                <div>
                    {
                        // By default it will navigate to guest pages.
                    }
                </div>
                
                <p className={cx('vertical-menu-tag')}>MENU</p>
                <Button
                    to={config.routes.dashboards}
                    types="primary"
                    className={cx('menu-choice')}
                    onClick={() => handleNavigate(config.routes.dashboards)}
                >
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faDashboard}/> Dashboards</p>
                </Button>
                <div>
                    <Button
                        types="primary"
                        className={cx('menu-choice-noti')}
                        onClick={handleShowNotification}
                    >
                        <p><FontAwesomeIcon icon={faBell}/> Notification</p>
                    </Button>
                    <Notification showNotification={showNotification} />
                </div>
                <Button
                    to={config.routes.events}
                    types="primary"
                    className={cx('menu-choice')}
                    onClick={() => handleNavigate(config.routes.events)}
                >
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCalendar}/> Events</p>
                </Button>
                
                <p className={cx('vertical-menu-tag')}>PAGES</p>
                <Button
                    to={config.routes.bookSettings}
                    types="primary"
                    className={cx('menu-choice')}
                    onClick={() => handleNavigate(config.routes.bookSettings)}
                >
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faBook}/> Book Settings</p>
                </Button>
                <Button
                    to={config.routes.orderSettings}
                    types="primary"
                    className={cx('menu-choice')}
                    onClick={() => handleNavigate(config.routes.orderSettings)}
                >
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faGear}/> Order Settings</p>
                </Button>
                <Button
                    to={config.routes.userManagement}
                    types="primary"
                    className={cx('menu-choice')}
                    onClick={() => handleNavigate(config.routes.userManagement)}
                >
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faUser}/> User Management</p>
                </Button>
                
                <p className={cx('vertical-menu-tag')}>AUTHENTICATION</p>
                <Button
                    to={config.routes.signin}
                    types="primary"
                    className={cx('menu-choice')}
                    onClick={() => handleNavigate(config.routes.signin)}
                >
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faSignOut}/> Sign Out</p>
                </Button>
            </div>
            {/* <nav>
                <div class="vertical-menu">
                    <p className={cx('vertical-menu-tag')}>MENU</p>
                    <a href="dashboards"><FontAwesomeIcon icon={faDashboard}/> Dashboards</a>
                    <a><FontAwesomeIcon icon={faBell}/> Notification</a>
                    <a href="events"><FontAwesomeIcon icon={faCalendar}/> Events</a>
                    <p className={cx('vertical-menu-tag')}>PAGES</p>
                    <a href="book-settings"><FontAwesomeIcon icon={faBook}/> Book Settings</a>
                    <a href="order-settings"><FontAwesomeIcon icon={faGear}/> Order Settings</a>
                    <a href="user-management"><FontAwesomeIcon icon={faUser}/> User Management</a>
                    <p className={cx('vertical-menu-tag')}>AUTHENTICATION</p>
                    <a href="signin"><FontAwesomeIcon icon={faSignOut}/> Sign Out</a>
                </div>
            </nav> */}
            {/* <span className={cx('menu-tag')}>MENU</span>
            <Button className={cx('dashboards-button')} types="text" to={config.routes.dashboard}>
                <FontAwesomeIcon icon={faDashboard} />
                <span className={cx('button-name')}>Dashboards</span>
            </Button>
            <Button className={cx('notification-button')} types="text" to={config.routes.dashboard}>
                <FontAwesomeIcon icon={faBell} />
                <span className={cx('button-name')}>Notification</span>
            </Button>
            <Button className={cx('events-button')} types="text" to={config.routes.dashboard}>
                <FontAwesomeIcon icon={faCalendar} />
                <span className={cx('button-name')}>Events</span>
            </Button>
            
            <span className={cx('pages-tag')}>PAGES</span>
            <Button className={cx('book-settings-button')} types="text" to={config.routes.dashboard}>
                <FontAwesomeIcon icon={faBook} />
                <span className={cx('button-name')}>Book Settings</span>
            </Button>
            <Button className={cx('order-settings-button')} types="text" to={config.routes.dashboard}>
                <FontAwesomeIcon icon={faGear} />
                <span className={cx('button-name')}>Order Settings</span>
            </Button>
            <Button className={cx('user-management-button')} types="text" to={config.routes.dashboard}>
                <FontAwesomeIcon icon={faUser} />
                <span className={cx('button-name')}>User Management</span>
            </Button>
            
            <span className={cx('authentication-tag')}>AUTHENTICATION</span>
            <Button className={cx('sign-out-button')} types="text" to={config.routes.dashboard}>
                <FontAwesomeIcon icon={faSignOut} />
                <span className={cx('button-name')}>Sign Out</span>
            </Button> */}
        </header>
    );
};

export default SideBar;
