import classNames from 'classnames/bind';
import styles from './Portfolio.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Portfolio() {
    return (
        <div className={cx('portfolio')}>
            <Image
                className={cx('avatar')}
                src="https://t3.ftcdn.net/jpg/01/93/38/40/360_F_193384026_F34lj9rX9W4ixlVZBrTJmijK010Tdv0j.jpg"
                alt="avatar"
            />
            <div className={cx('portfolio_body')}>
                <ul className={cx('achievement')}>
                    <li className={cx('achievement_item')}>
                        <p className={cx('amount')}>36</p>
                        <p className={cx('achievement_item_title')}>Products</p>
                    </li>
                    <li className={cx('achievement_item')}>
                        <p className={cx('amount')}>12</p>
                        <p className={cx('achievement_item_title')}>Comments</p>
                    </li>
                    <li className={cx('achievement_item')}>
                        <p className={cx('amount')}>4.8</p>
                        <p className={cx('achievement_item_title')}>Stars</p>
                    </li>
                </ul>
                <div className={cx('portfolio_info')}>
                    <div className={cx('portfolio_user_names')}>
                        <p className={cx('portfolio_username')}>John Cena</p>
                        <p className={cx('portfolio_fullname')}>John Felix Anthony Cena</p>
                    </div>
                    <div className={cx('portfolio_user_address')}>9601 Wilshire Blvd. 3rd Floor Beverly Hills, CA</div>
                    <div className={cx('portfolio_user_contact')}>johncena1977@hotmail.com</div>
                </div>
                <p className={cx('portfolio_footer')}>
                    John Felix Anthony Cena is an American actor and professional wrestler. He has been signed to WWE
                    since 2001, but has performed part-time since 2018. A record 16-time world champion as recognized by
                    WWE, he is regarded as one of the greatest professional wrestlers of all time.
                </p>
            </div>
        </div>
    );
}

export default Portfolio;
