import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CartPage.module.scss';
import CartItem from './components/CartItem';
import Vouchers from './components/Vouchers';
import Button from '~/components/Button';
import Image from '~/components/Image';
import assets from '~/assets';

const cx = classNames.bind(styles);

function CartPage({ products_list = [] }) {
    const isEmptyCart = products_list.length === 0;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <p className={cx('header')}>your cart</p>
                <div className={cx('body')}>
                    <div className={cx('products')}>
                        <div className={cx('products_header')}>
                            <div className={cx('select_all')}>
                                <input className={cx('checkbox_select_all')} type="checkbox" />
                                <p className={cx('select_all_title')}>Select all</p>
                            </div>
                            <select className={cx('options')}>
                                <option value="delete">Delete</option>
                            </select>
                            <p className={cx('products_amount')}>Amount</p>
                            <p className={cx('products_price')}>Price</p>
                        </div>
                        <div className={cx('core')}>
                            {isEmptyCart && <Image className={cx('empty_cart_img')} src={assets.empty_cart} />}
                            {/* <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem /> */}
                        </div>
                    </div>
                    <div className={cx('payment')}>
                        <div className={cx('voucher')}>
                            <Vouchers />
                        </div>
                        <div className={cx('checkout')}>
                            <div className={cx('total_checkout')}>
                                <p className={cx('checkout_text')}>Total</p>
                                <p className={cx('checkout_text')}>100.000.000 đ</p>
                            </div>
                            <div className={cx('total_checkout_vouchers')}>
                                <p className={cx('checkout_text')}>Total (with vouchers)</p>
                                <p className={cx('checkout_text')}>100.000.000 đ</p>
                            </div>
                            <Button className={cx('checkout_btn')}>Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;

/**https://blog.logrocket.com/creating-custom-select-dropdown-css/*/
