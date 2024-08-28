import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import Image from '../../../components/Image';
import { useState } from 'react';
import React from 'react';

const cx = classNames.bind(styles);

function NotificationItem({ active }) {
    const [showDetail, setShowDetail] = useState(false);

    const handleShowDetail = () => {
        setShowDetail(!showDetail);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', { active: active })} onClick={handleShowDetail}>
                <div className={cx('intro')}>
                    <Image
                        className={cx('avatar')}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtRFQ16ZzleEmS0E_SfHiVZXU8kjQrO7nWw&s"
                        alt="avatar"
                    />
                    <div className={cx('info')}>
                        <p className={cx('name')}>Admin</p>
                        <p className={cx('time')}>10 days ago</p>
                    </div>
                </div>
                <div className={cx('content')}>
                    <span className={cx('content_text')}>SIBOOKS Shop is finally back with more voucher !</span>
                </div>
                <div className={cx('dot', { active: active })}></div>
            </div>
            {showDetail && (
                <div className={cx('detail')}>
                    <span className={cx('detail_title')}>SIBOOKS Shop is finally back with more voucher !</span>
                    <span className={cx('detail_text')}>
                        Claim a 25% off voucher for any order reached 1.000.000 VND. You can use it anytime for once
                        until 01/07/2024. Limited for 1000 user.
                    </span>
                </div>
            )}
        </div>
    );
}

export default NotificationItem;
