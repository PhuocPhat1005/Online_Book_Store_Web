import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';

const cx = classNames.bind(styles);

function addDotsToNumber(number) {
    // Convert the number to a string and use a regular expression to add dots
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function CartItem({ data }) {
    const bookData = data.Book;
    const authorData = data.Author;
    const navigate = useNavigate();
    const [amount, setAmount] = useState(bookData.amount);

    let discount_percentage = 10;
    let old_price = addDotsToNumber(bookData.price).toString();
    let new_price = addDotsToNumber(Math.round((bookData.price * (100 - discount_percentage)) / 100)).toString();
    let total_price = addDotsToNumber(amount * bookData.price);

    const handleAddAmount = () => {
        setAmount((prev) => prev + 1);
    };

    const handleRemoveAmount = () => {
        if (amount <= 1) {
            return;
        }
        setAmount((prev) => prev - 1);
    };

    const handleClickProduct = () => {
        let detailData = bookData;

        detailData.author = authorData;
        navigate(config.routes.detailsbook, { state: { bookData: detailData } });
    };

    return (
        <div className={cx('wrapper')}>
            <input className={cx('select_item')} type="checkbox" />
            <div className={cx('information')} onClick={handleClickProduct}>
                <Image className={cx('product_img')} src={bookData.book_ava} alt="product_img" />
                <div className={cx('description')}>
                    <p className={cx('product_title')}>{bookData.book_name}</p>
                    <div className={cx('product_price')}>
                        <p className={cx('new_price')}>{new_price} đ</p>
                        <p className={cx('old_price')}>{old_price} đ</p>
                    </div>
                </div>
            </div>
            <div className={cx('amount')}>
                <span className={cx('minus_btn')} onClick={handleRemoveAmount}>
                    -
                </span>
                <span className={cx('amount_text')}>{amount}</span>
                <span className={cx('adding_btn')} onClick={handleAddAmount}>
                    +
                </span>
            </div>
            <div className={cx('total_price')}>
                <p className={cx('total')}>{total_price} đ</p>
                <FontAwesomeIcon className={cx('trash_icon')} icon={faTrashCan} />
            </div>
        </div>
    );
}

export default CartItem;
