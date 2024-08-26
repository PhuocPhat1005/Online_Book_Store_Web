import classNames from 'classnames/bind';
import styles from './OrderItem.module.scss';

import OrderItemBody from '../OrderItemBody';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function OrderItem({ status = '', data = [] }) {
    const [isOpenOverlay, setIsOpenOverlay] = useState(false);

    const handleOpenOverlay = () => {
        setIsOpenOverlay(!isOpenOverlay);
    };

    return (
        <>
            <div className={cx('order_item_wrapper')} onClick={handleOpenOverlay}>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <p className={cx('header_title')}>GHN_0123456789</p>
                        <p
                            className={cx('header_status', {
                                unprocessed: false,
                                confirmed: false,
                                delivering: true,
                                received: false,
                                cancelled: false,
                            })}
                        >
                            Delivering
                        </p>
                    </div>
                    {/* Max 2 items */}
                    <OrderItemBody />
                </div>
                <div className={cx('footer')}>
                    <p className={cx('product_number')}>Items: 1</p>
                    <div className={cx('total_price')}>
                        <p className={cx('total_price_text')}>Total price:</p>
                        <p className={cx('total_price_value')}>99.000đ</p>
                    </div>
                </div>
            </div>
            {isOpenOverlay && (
                <div className={cx('overlay')}>
                    <div className={cx('overlay_container')}>
                        <div className={cx('overlay_header')}>
                            <div className={cx('overlay_header_info')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faChevronLeft}
                                    onClick={handleOpenOverlay}
                                />
                                <p className={cx('overlay_header_text')}>GHN_0123456789</p>
                            </div>
                            <p
                                className={cx('header_status', {
                                    unprocessed: false,
                                    confirmed: false,
                                    delivering: true,
                                    received: false,
                                    cancelled: false,
                                })}
                            >
                                Delivering
                            </p>
                        </div>
                        <div className={cx('overlay_body')}>
                            <OrderItemBody className={cx('overlay_body_item')} />
                        </div>
                        <div className={cx('overlay_footer')}>
                            <p className={cx('overlay_product_number')}>Items: 1</p>
                            <div className={cx('overlay_total_price')}>
                                <p className={cx('overlay_total_price_text')}>Total price:</p>
                                <p className={cx('overlay_total_price_value')}>99.000đ</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default OrderItem;
