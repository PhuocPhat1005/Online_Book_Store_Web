import classNames from 'classnames/bind';
import styles from './Popper.module.scss';
import React from 'react';

const cx = classNames.bind(styles);

function Popper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Popper;
