import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
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
                        <span className={cx('label')}>Home</span>
                        <span className={cx('label')}>Shop Books</span>
                    </div>
                    <Tippy
                        interactive
                        placement="bottom"
                        render={(attrs) => (
                            <div className="box" tabIndex="-1" {...attrs}>
                                My tippy box
                            </div>
                        )}
                    >
                        <div className={cx('search-bar')}>
                            <input placeholder="Search..." spellCheck="false" />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </Tippy>
                </div>
                <div className={cx('user')}>
                    <img
                        className={cx('avatar')}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4jCa0Y7ckqLgBkad10uQ1PWQSshwlUgVZN6GTuvx_Q&s"
                        alt=""
                    />
                    <span className={cx('name')}>John</span>
                </div>
                <div className={cx('cart')}>
                    <FontAwesomeIcon icon={faCartShopping} />
                </div>
            </div>
        </header>
    );
}

export default Header;
