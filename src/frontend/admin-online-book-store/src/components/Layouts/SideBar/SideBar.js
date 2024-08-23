import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './SideBar.scss';
import Button from '../../../components/Button';
import Image from '../../../components/Image';
import Menu from '../../../components/Menu';
import Notification from '../../../components/Notification';
import config from '../../../config';
import assets from '../../../assets/';
import Search from '../../../components/Search';

const cx = classNames.bind(styles);

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Profile',
        to: config.routes.profile,
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
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <img className={cx('logo')} src={assets.logo} alt="logo" />
                <div className={cx('website-name')}>SIBOOKS WEB</div>
            </div>
            <Button className={cx('dashboard')} types="text" to={config.routes.dashboard}>
            </Button>
        </header>
    );
};

export default SideBar;
