import classNames from "classnames/bind";
import styles from './IncorrectBox.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React from 'react';

const cx = classNames.bind(styles)

function IncorrectBox({mess="", onClose}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <p className={cx('content')}>{mess}</p>
                <FontAwesomeIcon className={cx('icon')} icon={faXmark} onClick={onClose}/>
            </div>
        </div>
    )
}

export default IncorrectBox;
