import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Footer.module.scss';
import { faDiscord, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('information')}>
                    <div className={cx('social-media')}>
                        <p className={cx('title')}>Social Media</p>
                        <Button
                            href="https://www.facebook.com/sibooksbookstore"
                            className={cx('icon-btn')}
                            leftIcon={<FontAwesomeIcon icon={faFacebook} />}
                        ></Button>
                        <Button
                            href="https://discord.gg/tFmw7XYEAu"
                            className={cx('icon-btn')}
                            leftIcon={<FontAwesomeIcon icon={faDiscord} />}
                        ></Button>
                        <Button
                            href="https://x.com/sibookstore"
                            className={cx('icon-btn')}
                            leftIcon={<FontAwesomeIcon icon={faTwitter} />}
                        ></Button>
                    </div>
                    <div className={cx('about')}>
                        <p className={cx('title')}>SIBooks</p>
                        <p className={cx('details')}>
                            227 Nguyen Van Cu, District 5, Ho Chi Minh city, Vietnam | Open: 24 / 7.
                        </p>
                        <p className={cx('details')}>Contributors:</p>
                        <p className={cx('details')}>Lê Phước Phát | 22127322 (Leader)</p>
                        <p className={cx('details')}>Ngô Văn Khải | 22127174</p>
                        <p className={cx('details')}>Bùi Lê Khôi | 22127205</p>
                        <p className={cx('details')}>Tô Quốc Thanh | 22127388</p>
                        <p className={cx('details')}>Thái Huyễn Tùng | 22127441</p>
                    </div>
                    <div className={cx('online-shop')}>
                        <p className={cx('title')}>Online Shop</p>
                        <p className={cx('details')}>Fantasy</p>
                        <p className={cx('details')}>Fiction</p>
                        <p className={cx('details')}>Education</p>
                    </div>
                    <div className={cx('subcribe')}>
                        <p className={cx('title')}>Be In The Know</p>
                        <form className={cx('email-form')}>
                            <label className={cx('label')} htmlFor="email">
                                Subscribe to Our Newsletter
                            </label>
                            <input
                                className={cx('input-email')}
                                type="email"
                                name="email"
                                placeholder="Email *"
                                required
                            />
                            <Button className={cx('submit-btn')} types="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
                <div className={cx('copyright-information')}>
                    <p className={cx('copyright')}>
                        <FontAwesomeIcon icon={faCopyright} />
                        <span className={cx('text')}>2024 by SIBooks. Find Out More</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
