import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faBoxesPacking,
    faCartShopping,
    faComments,
    faRightFromBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Menu from '~/components/Menu';
import Notification from '~/components/Notification';
import config from '~/config';
import assets from '~/assets/';
import Search from '~/components/Search';

const cx = classNames.bind(styles);

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Profile',
        to: config.routes.profile,
    },
    {
        icon: <FontAwesomeIcon icon={faBoxesPacking} />,
        title: 'Orders',
        to: config.routes.order,
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Sign out',
        to: config.routes.guesthome,
    },
];

const Header = ({ guest }) => {
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        console.log(123);

        navigate(config.routes.guesthome);
    };

    const handleNavigate = (route, guestRoute) => {
        if (guest) {
            navigate(guestRoute);
        } else {
            navigate(route);
        }
    };

    const handleShowNotification = () => {
        setShowNotification(!showNotification);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <img className={cx('logo')} src={assets.logo} alt="logo" />
                <div className={cx('content')}>
                    <div className={cx('category')}>
                        <div>
                            {
                                // By default it will navigate to guest pages.
                            }
                        </div>
                        <Button
                            to={guest ? config.routes.guesthome : config.routes.home}
                            types="primary"
                            className={cx('label')}
                            onClick={() => handleNavigate(config.routes.home, config.routes.guesthome)}
                        >
                            Home
                        </Button>
                        <Button
                            to={guest ? config.routes.guestshopbooks : config.routes.shopbooks}
                            types="primary"
                            className={cx('label')}
                            onClick={() => handleNavigate(config.routes.shopbooks, config.routes.guestshopbooks)}
                        >
                            Shop Books
                        </Button>
                        <Button
                            to={guest ? config.routes.guestcontact : config.routes.contact}
                            types="primary"
                            className={cx('label')}
                            onClick={() => handleNavigate(config.routes.contact, config.routes.guestcontact)}
                        >
                            Contact
                        </Button>
                        <Button
                            to={guest ? config.routes.guestabout : config.routes.about}
                            types="primary"
                            className={cx('label')}
                            onClick={() => handleNavigate(config.routes.about, config.routes.guestabout)}
                        >
                            About
                        </Button>
                    </div>
                    <Search />
                </div>
                {guest ? (
                    <div className={cx('auth-buttons')}>
                        <Button className={cx('signin')} types="primary" to={config.routes.signin}>
                            Sign In
                        </Button>
                        <Button className={cx('signup')} types="primary" to={config.routes.signup}>
                            Sign Up
                        </Button>
                    </div>
                ) : (
                    <>
                        <Button className={cx('chat')} types="text">
                            <FontAwesomeIcon className={cx('chat-icon')} icon={faComments} />
                            <span className={cx('badge')}>99</span>
                        </Button>
                        <div className={cx('notification_container')}>
                            <Button className={cx('notification')} types="text" onClick={handleShowNotification}>
                                <FontAwesomeIcon className={cx('notification-icon')} icon={faBell} />
                                <span className={cx('badge')}>99</span>
                            </Button>
                            <Notification showNotification={showNotification} />
                        </div>
                        <div>
                            <Menu items={USER_MENU} onSignOut={handleSignOut}>
                                <div className={cx('user')}>
                                    <Image className={cx('avatar')} src={assets.default_avartar} alt="" />
                                    <span className={cx('name')}>John</span>
                                </div>
                            </Menu>
                        </div>
                        <Button className={cx('cart')} types="text" to={config.routes.cart}>
                            <FontAwesomeIcon icon={faCartShopping} />
                            {/* <span className={cx('badge')}>99</span> */}
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
