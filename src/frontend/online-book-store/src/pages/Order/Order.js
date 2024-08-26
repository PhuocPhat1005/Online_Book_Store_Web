import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { useState } from 'react';
import OrderItem from './components/OrderItem';

const cx = classNames.bind(styles);
const ORDER_STATUS = ['All', 'Unprocessed', 'Confirmed', 'Delivering', 'Received', 'Cancelled/ Returned'];

function Order() {
    /**
     * Steps:
     * Query an API to get all orders (including order statuses) and store them in an array.
     * Iterating through each orders and checking if the status of that order is equal to current status.
     * The status in <OrderItem /> will be passed without status 'All' so that we can check when we should cancel order (unprocessed) or send feedbacks (received),...
     */
    const [orderlist, setOrderList] = useState([]);
    const [isActiveTab, setIsActiveTab] = useState(0);

    const handleActiveOrderStatus = (index) => {
        setIsActiveTab(index);
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>your order</p>
            <div className={cx('core')}>
                <ul className={cx('core_header')}>
                    {ORDER_STATUS.map((item, index) => (
                        <li
                            key={index}
                            className={cx('core_header_item', { active: index === isActiveTab })}
                            onClick={() => handleActiveOrderStatus(index)}
                        >
                            <span className={cx('core_header_item_text')}>{item}</span>
                        </li>
                    ))}
                </ul>
                <div className={cx('core_body')}>
                    <OrderItem />
                    <OrderItem />
                    <OrderItem />
                    <OrderItem />
                </div>
            </div>
        </div>
    );
}

export default Order;
