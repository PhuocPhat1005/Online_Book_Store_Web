import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSquareShareNodes,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

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
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('search-bar')}>
                    <Search />
                </div>
                <div>
                    <Menu items={USER_MENU} onSignOut={handleSignOut}>
                        <div className={cx('user')}>
                            <Image className={cx('avatar')} src={assets.default_avartar} alt="" />
                            <span className={cx('name')}>John</span>
                        </div>
                    </Menu>
                </div>
                <Button
                    // class="btn btn-success"
                    className={cx('social-contact')}
                    types="primary"
                    onClick={handleShowSocialContact}
                >
                    <p><FontAwesomeIcon icon={faSquareShareNodes}/></p>
                    <SocialContact showSocialContact={showSocialContact} />
                </Button>
            </div>
        </header>
    );
};

export default Header;
