import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faMagnifyingGlass,
    faRightFromBracket,
    faSpinner,
    faUser,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import BookItem from '~/components/BookItem';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Menu from '~/components/Menu';
import config from '~/config';

const cx = classNames.bind(styles);
const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Profile',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Sign out',
        to: '/signin',
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setSearchResult([1, 2, 3]);
    //     }, 1000);
    // }, []);

    const renderSearchResult = (attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <h4 className={cx('search-title')}>Products</h4>
                <BookItem />
                <BookItem />
                <BookItem />
                <BookItem />
            </PopperWrapper>
        </div>
    );

    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <img
                    className={cx('logo')}
                    src="https://media.discordapp.net/attachments/1180385796994379798/1241064525080559626/SIBOOKS.png?ex=6648d6e8&is=66478568&hm=2c3db54c65d3a50472a9096ab5917a1151ec250d16669d06e98452fcb5125bd1&=&format=webp&quality=lossless&width=1440&height=240"
                    alt="logo"
                />
                <div className={cx('content')}>
                    <div className={cx('category')}>
                        <Button to={config.routes.home} types="primary" className={cx('label')}>
                            Home
                        </Button>
                        <Button to={config.routes.shopbooks} types="primary" className={cx('label')}>
                            Shop Books
                        </Button>
                        <Button to={config.routes.contact} types="primary" className={cx('label')}>
                            Contact
                        </Button>
                        <Button to={config.routes.about} types="primary" className={cx('label')}>
                            About
                        </Button>
                    </div>
                    <Tippy
                        offset={[0, 10]}
                        visible={searchResult.length > 0}
                        interactive
                        placement="bottom"
                        render={renderSearchResult}
                    >
                        <div className={cx('search-bar')}>
                            <input placeholder="Search..." spellCheck="false" />
                            <button className={cx('clear')}>
                                <FontAwesomeIcon icon={faXmarkCircle} />
                            </button>
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </Tippy>
                </div>
                <div>
                    <Menu items={USER_MENU}>
                        <div className={cx('user')}>
                            <Image
                                className={cx('avatar')}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4jCa0Y7ckqLgBkad10uQ1PWQSshwlUgVZN6GTuvx_Q&s"
                                alt=""
                            />
                            <span className={cx('name')}>John</span>
                        </div>
                    </Menu>
                </div>
                <div className={cx('cart')}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className={cx('badge')}>99</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
