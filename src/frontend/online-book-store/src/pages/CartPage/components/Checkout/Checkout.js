import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useState } from 'react';
import CheckoutAddress from '../CheckoutAddress';

const cx = classNames.bind(styles);

function Checkout({ closeCheckoutFunc }) {
    const [isPopupCheckout, setIsPopupCheckout] = useState(false);

    const handleIsPopupCheckout = () => {
        setIsPopupCheckout(!isPopupCheckout);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('header_user_information')}>
                        <div className={cx('information')}>
                            <div className={cx('contact_info')}>
                                <p className={cx('username')}>John</p>
                                <p className={cx('phone_number')}>0123456789</p>
                            </div>
                            <p className={cx('email_info')}>john@gmail.com</p>
                        </div>
                        <FontAwesomeIcon className={cx('close_icon')} icon={faXmark} onClick={closeCheckoutFunc} />
                    </div>
                    <div className={cx('address')}>
                        <p className={cx('address_text')}>12/3A Qwerty St., Ward Poiu, Dist. 4, QAZ</p>
                        <Button className={cx('change_address_btn')} types="text" onClick={handleIsPopupCheckout}>
                            Change
                        </Button>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('methods')}>
                        <div className={cx('payment_methods')}>
                            <p className={cx('title_method')}>Payment Method</p>
                            <select className={cx('selection')}>
                                <option value="ondelivery">Cash on Delivery</option>
                                <option value="bank">Bank account</option>
                            </select>
                        </div>
                        <div className={cx('delivery_methods')}>
                            <p className={cx('title_method')}>Delivery Method</p>
                            <select className={cx('selection')}>
                                <option value="standard">Standard Delivery</option>
                                <option value="quick">Quick Delivery</option>
                                <option value="superfast">Super Fast Delivery</option>
                            </select>
                        </div>
                    </div>
                    <ul className={cx('fees')}>
                        <li className={cx('fee_item')}>
                            <p className={cx('fee_item_name')}>Order price</p>
                            <p className={cx('fee_item_value')}>0 đ</p>
                        </li>
                        <li className={cx('fee_item')}>
                            <p className={cx('fee_item_name')}>Voucher</p>
                            <p className={cx('fee_item_value', { minus: true })}>- 0 đ</p>
                        </li>
                        <li className={cx('fee_item')}>
                            <p className={cx('fee_item_name')}>Delivery fee</p>
                            <p className={cx('fee_item_value', { add: true })}>+ 0 đ</p>
                        </li>
                        <li className={cx('fee_item')}>
                            <p className={cx('fee_item_name')}>Other</p>
                            <p className={cx('fee_item_value', { add: true })}>+ 0 đ</p>
                        </li>
                    </ul>
                </div>
                <div className={cx('footer')}>
                    <p className={cx('total_text')}>Total:</p>
                    <div className={cx('total_price')}>
                        <p className={cx('price')}>0 đ</p>
                        <Button className={cx('buy_now_btn')} types="text">
                            buy now
                        </Button>
                    </div>
                </div>
            </div>
            {isPopupCheckout && <CheckoutAddress handlePopupcheckout={handleIsPopupCheckout} />}
        </div>
    );
}

export default Checkout;
