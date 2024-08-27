import React from 'react';
import classNames from 'classnames/bind';
import styles from './PopUpSentSuccesful.module.scss';

const cx = classNames.bind(styles);

function PopUpSentSuccesful({ message, onClose }) {
    return (
        <div className={cx('overlay')}>
            <div className={cx('popup')}>
                <p className={cx('message')}>{message}</p>
                <button className={cx('close-btn')} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default PopUpSentSuccesful;
