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

    const [originalPrice, setOriginalPrice] = useState([]);
    const [price, setPrice] = useState(Number(0));
    const [totalPriceCheckoutNumber, setTotalPriceCheckoutNumber] = useState(Number(0));
    const [totalPriceCheckout, setTotalPriceCheckout] = useState('');
    const [totalPriceCheckoutVoucher, setTotalPriceCheckoutVoucher] = useState('');
    const [discountVoucher, setDiscountVoucher] = useState({});

    const [checkedArray, setCheckedArray] = useState([]); // array contains index of product which will be checked.
    const [isCheckedAll, setIsCheckedAll] = useState(false);

    const handleCheckout = () => {
        setIsCheckout(!isCheckout);
    };

    const handlePrice = (price) => {
        setPrice((prev) => prev + price);
    };

    const handleOriginalPrice = (id, origin = '', amount = 1, option = '') => {
        if (option === 'delete') {
            setOriginalPrice((prev) => {
                return prev.filter((item) => item.id !== id);
            });
        }

        setOriginalPrice((prev) => {
            // console.log('Previous state:', prev);
            if (!prev.some((item) => item.id === id)) {
                const updatedState = [...prev, { id: id, price: origin, amount: amount }];
                // console.log('Updated state:', updatedState);
                return updatedState;
            }
            return prev;
        });
    };

    const handleDiscountVoucher = (value) => {
        setDiscountVoucher(value);
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
        // console.log('bids', booksIdInCart);

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
        } else if (booksIdInCart.length === 0) {
            setBooksInCart([]);
            setIsEmptyCart(true);
        }
    }, [booksIdInCart, isEmptyCart, isLoading]);

    useEffect(() => {
        const totalSum = originalPrice.reduce((sum, item) => sum + Number(item.price), 0);
        const discount = discountVoucher.discount !== undefined ? discountVoucher.discount : 0;

        // console.log(totalSum);
        // console.log(originalPrice);

        setTotalPriceCheckoutNumber(price + totalSum);
        setTotalPriceCheckout(addDotsToNumber(totalPriceCheckoutNumber));
        setTotalPriceCheckoutVoucher(addDotsToNumber(((price + totalSum) * (100 - discount)) / 100));
    }, [price, originalPrice, totalPriceCheckout, discountVoucher, totalPriceCheckoutNumber]);

    /** Handle delete product */

    const handleDeleteSignleProduct = async (id) => {
        try {
            await request.delete(`cart/delete_book_in_cart?access_token=${access_token}&book_id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const newBooksIdInCart = booksIdInCart.filter((item) => item.book_id !== id);
            setBooksIdInCart(newBooksIdInCart);
            setIsEmptyCart((prevBooksIdInCart) => prevBooksIdInCart.length === 0);
            handleOriginalPrice(id, '', 1, 'delete');
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await request.delete(`cart/delete_book_in_cart?access_token=${access_token}&book_id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            handleOriginalPrice(id, '', 1, 'delete');
        } catch (error) {
            console.log(error);
        }
    };

    const handleOptionDelete = async () => {
        if (checkedArray.length <= 0) return;

        try {
            const ids = [];
            const deletePromises = checkedArray.map(async (checkedItem) => {
                const id = booksInCart[checkedItem].Book.id;
                ids.push(id);
                await handleDeleteProduct(id);
            });

            // Wait for all delete requests to complete
            await Promise.all(deletePromises);

            // Use a functional update to ensure that the latest state is captured
            setBooksIdInCart((prevBooksIdInCart) => {
                const newBooksIdInCart = prevBooksIdInCart.filter((item) => !ids.includes(item.book_id));
                return newBooksIdInCart;
            });

            // Ensure the cart is marked as empty if there are no items left
            setIsEmptyCart((prevBooksIdInCart) => prevBooksIdInCart.length === 0);
        } catch (error) {
            console.log(error);
        }
    };

    /** Handle check all */

    const handleCheckedAll = () => {
        setIsCheckedAll(!isCheckedAll);
    };

    const handleCheck = (id) => {
        setCheckedArray((prev) => {
            const isChecked = checkedArray.includes(id);

            if (isChecked) {
                return checkedArray.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    useEffect(() => {
        if (isCheckedAll === true) {
            setCheckedArray(Array.from({ length: booksInCart.length }, (_, index) => index));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCheckedAll]);

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
                                        onChange={handleCheckedAll}
                                    />
                                    <p className={cx('select_all_title')}>Select all</p>
                                </div>
                                <select className={cx('options')} onClick={handleOptionDelete}>
                                    <option value="delete">Delete</option>
                                </select>
                                <p className={cx('products_amount')}>Amount</p>
                                <p className={cx('products_price')}>Price</p>
                            </div>
                            <div className={cx('core')}>
                                {isLoading && <BasicSpinner color="#808080" />}
                                {isEmptyCart && <Image className={cx('empty_cart_img')} src={assets.empty_cart} />}
                                {isSuccessfull &&
                                    booksInCart &&
                                    booksInCart.map((data_item, index) => (
                                        <CartItem
                                            key={index}
                                            data={data_item}
                                            handlePrice={handlePrice}
                                            originalPrice={handleOriginalPrice}
                                            handleDeleteProduct={handleDeleteSignleProduct}
                                            checked={checkedArray.includes(index)}
                                            onChange={() => handleCheck(index)}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className={cx('payment')}>
                            <div className={cx('voucher')}>
                                <Vouchers handleDiscountVoucher={handleDiscountVoucher} />
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
            {isCheckout && (
                <Checkout
                    closeCheckoutFunc={handleCheckout}
                    orderPrice={totalPriceCheckoutNumber}
                    voucherDiscount={discountVoucher}
                />
            )}
        </>
    );
}

export default CartPage;

/**https://blog.logrocket.com/creating-custom-select-dropdown-css/*/
