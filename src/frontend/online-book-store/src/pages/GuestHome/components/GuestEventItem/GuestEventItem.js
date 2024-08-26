import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './GuestEventItem.module.scss';
import Button from '~/components/Button';
import PopUp from '~/components/PopUp';

const cx = classNames.bind(styles);

function GuestEventItem({ data }) {
    // State to manage whether the PopUp is shown
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    // Open & close PopUp
    const handleButtonClick = () => {
        setIsPopUpVisible(true);
    };
    const handleClosePopUp = () => {
        setIsPopUpVisible(false);
    };

    return (
        <div className={cx('wrapper')} style={{ backgroundColor: `${data.color}` }}>
            <div className={cx('container')}>
                <span className={cx('icon')}>{data.icon}</span>
                <p className={cx('title')}>{data.title}</p>
                <p className={cx('description')}>{data.description}</p>

                {/* Change Button's onClick to trigger the PopUp */}
                <Button onClick={handleButtonClick} className={cx('more-btn')} types="findmore">
                    Find Out More
                </Button>
            </div>

            {/* Render PopUp conditionally based on the state */}
            {isPopUpVisible && <PopUp onClose={handleClosePopUp} />}
        </div>
    );
}

export default GuestEventItem;
