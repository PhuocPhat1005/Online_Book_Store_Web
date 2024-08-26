import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CartPage.module.scss';
import CartItem from './components/CartItem';
import Vouchers from './components/Vouchers';
import Button from '~/components/Button';
import Image from '~/components/Image';
import assets from '~/assets';
import Checkout from './components/Checkout';

import request from '~/utils/request';
import Cookies from 'universal-cookie';
import BasicSpinner from '~/components/BasicSpinner';

const cx = classNames.bind(styles);

function addDotsToNumber(number) {
    // Convert the number to a string and use a regular expression to add dots
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function CartPage() {
    const [isEmptyCart, setIsEmptyCart] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSuccessfull, setIsSuccessfull] = useState(false);

    const [originalPrice, setOriginalPrice] = useState(Number(0));
    const [price, setPrice] = useState(Number(0));
    const [totalPriceCheckout, setTotalPriceCheckout] = useState('');
    const [totalPriceCheckoutVoucher, setTotalPriceCheckoutVoucher] = useState('');

    const [isCheckedAll, setIsCheckedAll] = useState(false);

    const handleCheckout = () => {
        setIsCheckout(!isCheckout);
    };

    const handlePrice = (price) => {
        setPrice((prev) => prev + price);
    };

    const cookies = new Cookies();
    const access_token = cookies.get('jwt_authorization');

    const [booksIdInCart, setBooksIdInCart] = useState([]);
    const [booksInCart, setBooksInCart] = useState([]);

    const fetchBooksInCart = async (item) => {
        try {
            const response = await request.get(`book/get_book/${item.book_id}`);

            if (response.status === 200) {
                response.data.Book.amount = item.amount;

                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchBooksIdInCart = async () => {
            setIsLoading(true);
            try {
                const response = await request.get('cart/show_book_in_cart', {
                    params: {
                        access_token: access_token,
                    },
                });
                if (response.status === 200) {
                    if (response.data) {
                        setBooksIdInCart(response.data);
                        setIsEmptyCart(false);
                    } else {
                        setIsEmptyCart(true);
                    }
                }
            } catch (error) {
                setIsEmptyCart(true);
                setIsLoading(false);
                console.log(error);
            }
        };
        fetchBooksIdInCart();
    }, [access_token]);

    // Fetch the book details when booksIdInCart is updated
    useEffect(() => {
        const fetchAllBooksInCart = async () => {
            const books = await Promise.all(booksIdInCart.map((item) => fetchBooksInCart(item)));
            setBooksInCart(books);
            setIsLoading(false);
        };

        if (booksIdInCart.length > 0) {
            fetchAllBooksInCart();
            if (!isEmptyCart && !isLoading) {
                setIsSuccessfull(true);
            }
        }
    }, [booksIdInCart, isEmptyCart, isLoading]);

    useEffect(() => {
        setTotalPriceCheckout(addDotsToNumber(price + originalPrice));
        setTotalPriceCheckoutVoucher(addDotsToNumber(totalPriceCheckout));
    }, [price, originalPrice, totalPriceCheckout]);

    /** Handle delete product */

    const handleDeleteProduct = async (id) => {
        try {
            await request.delete(`cart/delete_book_in_cart?access_token=${access_token}&book_id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    /** Handle check all */

    const handleCheckAll = () => {
        setIsCheckedAll(true);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <p className={cx('header')}>your cart</p>
                    <div className={cx('body')}>
                        <div className={cx('products')}>
                            <div className={cx('products_header')}>
                                <div className={cx('select_all')}>
                                    <input
                                        className={cx('checkbox_select_all')}
                                        type="checkbox"
                                        onChange={handleCheckAll}
                                    />
                                    <p className={cx('select_all_title')}>Select all</p>
                                </div>
                                <select className={cx('options')}>
                                    <option value="delete">Delete</option>
                                </select>
                                <p className={cx('products_amount')}>Amount</p>
                                <p className={cx('products_price')}>Price</p>
                            </div>
                            <div className={cx('core')}>
                                {isLoading && <BasicSpinner color="#808080" />}
                                {isEmptyCart && <Image className={cx('empty_cart_img')} src={assets.empty_cart} />}
                                {isSuccessfull &&
                                    booksInCart.map((data_item, index) => (
                                        <CartItem
                                            key={index}
                                            data={data_item}
                                            handlePrice={handlePrice}
                                            originalPrice={setOriginalPrice}
                                            handleDeleteProduct={handleDeleteProduct}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className={cx('payment')}>
                            <div className={cx('voucher')}>
                                <Vouchers />
                            </div>
                            <div className={cx('checkout')}>
                                <div className={cx('total_checkout')}>
                                    <p className={cx('checkout_text')}>Total</p>
                                    <p className={cx('checkout_text')}>{totalPriceCheckout} đ</p>
                                </div>
                                <div className={cx('total_checkout_vouchers')}>
                                    <p className={cx('checkout_text')}>Total (with vouchers)</p>
                                    <p className={cx('checkout_text')}>{totalPriceCheckoutVoucher} đ</p>
                                </div>
                                <Button className={cx('checkout_btn')} onClick={handleCheckout}>
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isCheckout && <Checkout closeCheckoutFunc={handleCheckout} />}
        </>
    );
}

export default CartPage;

/**https://blog.logrocket.com/creating-custom-select-dropdown-css/*/
