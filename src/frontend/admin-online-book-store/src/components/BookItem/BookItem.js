import classNames from 'classnames/bind';

import styles from './BookItem.module.scss';
import Image from '../../components/Image';
import React from 'react';


const cx = classNames.bind(styles);

function BookItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.book_ava} alt="avatar" />
            <div className={cx('information')}>
                <span className={cx('title')}>{data.book_name}</span>
                <span className={cx('description')}>{data.description}</span>
            </div>
        </div>
    );
}

export default BookItem;
