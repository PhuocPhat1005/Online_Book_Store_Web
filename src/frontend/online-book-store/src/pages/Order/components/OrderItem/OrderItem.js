import classNames from 'classnames/bind';
import styles from './OrderItem.module.scss';

import OrderItemBody from '../OrderItemBody';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import request from '~/utils/request';

const cx = classNames.bind(styles);

function addDotsToNumber(number) {
    // Convert the number to a string and use a regular expression to add dots
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function OrderItem({ status = 'Unprocessed', bookData = [] }) {
    let discount_percentage = 10;
    const [isOpenOverlay, setIsOpenOverlay] = useState(false);

    const handleOpenOverlay = () => {
        setIsOpenOverlay(!isOpenOverlay);
    };

    /** Books for each order */
    const [books, setBooks] = useState([]);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchDetailedBooks = async () => {
            try {
                const booksResponse = await Promise.all(
                    bookData.map(async (item) => {
                        const response = await request.get(`book/get_book/${item.book_id}`);
                        return response.status === 200 ? response.data : null;
                    }),
                );

                // Filter out any null responses due to unsuccessful fetches
                const validBooks = booksResponse.filter((item) => item !== null);
                setBooks(validBooks);

                // Calculate total quantity
                const totalQuantity = bookData.reduce((acc, book) => acc + book.quantity, 0);
                setQuantity(totalQuantity);
            } catch (error) {
                console.log(error);
            }
        };

        if (bookData.length > 0) {
            fetchDetailedBooks();
        }
    }, [bookData]);

    /** Price */
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let sumPrice = 0;

        for (let i = 0; i < books.length; i += 1) {
            sumPrice += (books[i].Book.price * bookData[i].quantity * (100 - discount_percentage)) / 100;
        }

        setTotalPrice(sumPrice);
    }, [bookData, books, discount_percentage, quantity]);

    return (
        <>
            <div className={cx('order_item_wrapper')} onClick={handleOpenOverlay}>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <p className={cx('header_title')}>GHN_0123456789</p>
                        <p
                            className={cx('header_status', {
                                unprocessed: true,
                                confirmed: false,
                                delivering: false,
                                received: false,
                                cancelled: false,
                            })}
                        >
                            {status}
                        </p>
                    </div>
                    {/* Max 1 item */}
                    {books.length !== 0 && <OrderItemBody data={books[0]} quantity={bookData[0].quantity} />}
                </div>
                <div className={cx('footer')}>
                    <p className={cx('product_number')}>Items: {quantity}</p>
                    <div className={cx('total_price')}>
                        <p className={cx('total_price_text')}>Total price:</p>
                        <p className={cx('total_price_value')}>{addDotsToNumber(totalPrice)} đ</p>
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
                                    unprocessed: true,
                                    confirmed: false,
                                    delivering: false,
                                    received: false,
                                    cancelled: false,
                                })}
                            >
                                {status}
                            </p>
                        </div>
                        <div className={cx('overlay_body')}>
                            {books.map((item, index) => (
                                <OrderItemBody
                                    className={cx('overlay_body_item')}
                                    data={item}
                                    quantity={bookData[index].quantity}
                                    key={index}
                                />
                            ))}
                        </div>
                        <div className={cx('overlay_footer')}>
                            <p className={cx('overlay_product_number')}>Items: {quantity}</p>
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
