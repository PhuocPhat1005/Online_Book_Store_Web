import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import CheckoutAddress from '../CheckoutAddress';
import request from '~/utils/request';
import Cookies from 'universal-cookie';

const cx = classNames.bind(styles);

function addDotsToNumber(number) {
    // Convert the number to a string and use a regular expression to add dots
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function Checkout({ closeCheckoutFunc, orderPrice, voucherDiscount }) {
    const [isPopupCheckout, setIsPopupCheckout] = useState(false);
    const [deliveryTypes, setDeliveryTypes] = useState([]);
    const [currentDeliveryType, setCurrentDeliveryType] = useState({});
    const [totalPrice, setTotalPrice] = useState(Number(0));

    const [paymentMethod, setPaymentMethod] = useState('QR');
    const [addressId, setAddressId] = useState('');
    const [isSuccessfull, setIsSuccessfull] = useState(false);

    const handleIsPopupCheckout = () => {
        setIsPopupCheckout(!isPopupCheckout);
    };

    const handlePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
    };

    useEffect(() => {
        const fetchDelivery = async () => {
            try {
                const response = await request.get('shipping/show_all_shippings');

                if (response.status === 200) {
                    setDeliveryTypes(response.data);
                    setCurrentDeliveryType(response.data[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchDelivery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** Delivery */

    const handleChooseDeliveryType = (value) => {
        setCurrentDeliveryType((_) => {
            return deliveryTypes.find((item) => item.shipping_method === value);
        });
    };

    /** Total price */

    useEffect(() => {
        const shippingFee = currentDeliveryType ? currentDeliveryType.cost_unit : 0;

        setTotalPrice(orderPrice - (voucherDiscount.discount / 100) * orderPrice + shippingFee);
    }, [currentDeliveryType, orderPrice, voucherDiscount]);

    /** Submit BUY NOW */

    const [isInValid, setIsInValid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState('Oops, you have missed some information.');

    const handleSubmitBuyNow = async () => {
        if (addressId === '' || voucherDiscount === 0 || voucherDiscount.code === undefined) {
            setIsInValid(true);
            return;
        }

        const cookies = new Cookies();
        const access_token = cookies.get('jwt_authorization');

        try {
            await request.post(
                `order/create_order?access_token=${access_token}&payment_method=${paymentMethod}&address_id=${addressId}&shipping_id=${
                    currentDeliveryType.id
                }&voucher_code=${voucherDiscount ? voucherDiscount.code : null}`,
                null,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            setIsSuccessfull(true);
        } catch (error) {
            console.log(error);
            setIsInValid(true);
            setInvalidMessage('Opps, there is nothing in your cart.');
        }
    };

    /** Successfully checkout */

    const handleCloseCheckout = () => {
        setIsSuccessfull(false);
    };

    return (
        <>
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
                                <select className={cx('selection')} onChange={handlePaymentMethod}>
                                    <option value="QR">Bank account</option>
                                    <option value="COD">Cash on Delivery</option>
                                </select>
                            </div>
                            <div className={cx('delivery_methods')}>
                                <p className={cx('title_method')}>Delivery Method</p>
                                <select
                                    className={cx('selection')}
                                    onChange={(e) => handleChooseDeliveryType(e.target.value)}
                                >
                                    {deliveryTypes.map((item, index) => (
                                        <option key={index} value={item.shipping_method}>
                                            {item.shipping_method}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <ul className={cx('fees')}>
                            <li className={cx('fee_item')}>
                                <p className={cx('fee_item_name')}>Order price</p>
                                <p className={cx('fee_item_value')}>{addDotsToNumber(orderPrice)} đ</p>
                            </li>
                            <li className={cx('fee_item')}>
                                <p className={cx('fee_item_name')}>Voucher</p>
                                <p className={cx('fee_item_value', { minus: true })}>
                                    - {addDotsToNumber((voucherDiscount.discount / 100) * orderPrice)} đ
                                </p>
                            </li>
                            <li className={cx('fee_item')}>
                                <p className={cx('fee_item_name')}>Delivery fee</p>
                                <p className={cx('fee_item_value', { add: true })}>
                                    +
                                    {currentDeliveryType && currentDeliveryType.cost_unit
                                        ? addDotsToNumber(currentDeliveryType.cost_unit)
                                        : '0'}
                                    đ
                                </p>
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
                            <p className={cx('price')}>{addDotsToNumber(totalPrice)} đ</p>
                            <Button className={cx('buy_now_btn')} types="text" onClick={handleSubmitBuyNow}>
                                buy now
                            </Button>
                        </div>
                    </div>
                </div>
                {isPopupCheckout && (
                    <CheckoutAddress handlePopupcheckout={handleIsPopupCheckout} setAddressId={setAddressId} />
                )}
            </div>
            {isSuccessfull && (
                <div className={cx('success_checkout')}>
                    <div className={cx('popup')}>
                        <div className={cx('popup_header')}>
                            <p className={cx('popup_title')}>Successfully</p>
                            <FontAwesomeIcon
                                icon={faXmark}
                                className={cx('popup_close')}
                                onClick={handleCloseCheckout}
                            />
                        </div>
                        <div className={cx('popup_body')}>
                            <p className={cx('popup_text')}>Thanks for your checkout.</p>
                        </div>
                    </div>
                </div>
            )}
            {isInValid && (
                <div className={cx('invalid_popup')}>
                    <div className={cx('invalid_popup_header')}>
                        <p className={cx('invalid_popup_text')}>{invalidMessage}</p>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className={cx('invalid_popup_close')}
                            onClick={() => setIsInValid(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Checkout;
