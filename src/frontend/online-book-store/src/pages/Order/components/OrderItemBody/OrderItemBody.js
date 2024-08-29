import classNames from 'classnames/bind';
import styles from './OrderItemBody.module.scss';

import Image from '~/components/Image';

const cx = classNames.bind(styles);

function addDotsToNumber(number) {
    // Convert the number to a string and use a regular expression to add dots
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function OrderItemBody({ className, data = {}, quantity = 1 }) {
    const bookData = data.Book;

    let discount_percentage = 0;
    let newPrice = (bookData.price * (100 - discount_percentage)) / 100;
    let oldPrice = bookData.price;

    return (
        <div
            className={cx('body', {
                [className]: className,
            })}
        >
            <div className={cx('product_details')}>
                <Image className={cx('product_img')} src={bookData.book_ava} />
                <div className={cx('product_information')}>
                    <p className={cx('product_title')}>{bookData.book_name}</p>
                    <p className={cx('product_quantity')}>x {quantity}</p>
                    <div className={cx('prices')}>
                        <p className={cx('new_price')}>{addDotsToNumber(newPrice)} đ</p>
                        <p className={cx('old_price')}>{addDotsToNumber(oldPrice)} đ</p>
                    </div>
                </div>
            </div>
            <p className={cx('total_price_product')}>{addDotsToNumber(newPrice * quantity)}đ</p>
        </div>
    );
}

export default OrderItemBody;
