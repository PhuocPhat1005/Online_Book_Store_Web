import classNames from 'classnames/bind';
import styles from './ConnectedLine.module.scss';
import React from 'react';

const cx = classNames.bind(styles);

function ConntectedLine() {
    return <div className={cx('connected-line')}></div>;
}

export default ConntectedLine;
