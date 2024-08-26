import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
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
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* <img className={cx('logo')} src={assets.logo} alt="logo" /> */}
                <div className={cx('search-bar')}>
                    <Search />
                </div>
                {admin ? (
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
                        {/* <Button className={cx('chat')} types="text">
                            <FontAwesomeIcon className={cx('chat-icon')} icon={faComments} />
                            <span className={cx('badge')}>99</span>
                        </Button> */}
                        <div>
                            <Menu items={USER_MENU} onSignOut={handleSignOut}>
                                <div className={cx('user')}>
                                    <Image className={cx('avatar')} src={assets.default_avartar} alt="" />
                                    <span className={cx('name')}>John</span>
                                </div>
                            </Menu>
                        </div>
                        {/* <Button className={cx('cart')} types="text" to={config.routes.cart}>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span className={cx('badge')}>99</span>
                        </Button> */}
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
