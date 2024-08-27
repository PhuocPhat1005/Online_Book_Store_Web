import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function CartItem({ data, handlePrice, originalPrice, handleDeleteProduct, checked, onChange }) {
    const bookData = data.Book;

    const authorData = data.Author;
    const navigate = useNavigate();
    const [amount, setAmount] = useState(bookData.amount);
    const [isAdd, setIsAdd] = useState(false);
    const [isRemove, setIsRemove] = useState(false);

    let discount_percentage = 10;
    let old_price = bookData.price;
    let new_price = Math.round((bookData.price * (100 - discount_percentage)) / 100);
    let total_price = amount * new_price;

    let old_price_formatted = addDotsToNumber(old_price);
    let new_price_formatted = addDotsToNumber(new_price);
    let total_price_formatted = addDotsToNumber(total_price);

    const handleAddAmount = () => {
        setAmount((prev) => prev + 1);
        setIsAdd(true);
    };

    const handleRemoveAmount = () => {
        if (amount <= 1) {
            return;
        }
        setAmount((prev) => prev - 1);
        setIsRemove(true);
    };

    const handleClickProduct = () => {
        let detailData = bookData;

        detailData.author = authorData;
        navigate(config.routes.detailsbook, { state: { bookData: detailData } });
    };

    useEffect(() => {
        if (isAdd) {
            setIsAdd(false);
            handlePrice(new_price);
        } else if (isRemove) {
            setIsRemove(false);
            handlePrice(-new_price);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdd, isRemove]);

    useEffect(() => {
        originalPrice(bookData.id, total_price, amount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <input className={cx('select_item')} type="checkbox" checked={checked} onChange={onChange} />
            <div className={cx('information')} onClick={handleClickProduct}>
                <Image className={cx('product_img')} src={bookData.book_ava} alt="product_img" />
                <div className={cx('description')}>
                    <p className={cx('product_title')}>{bookData.book_name}</p>
                    <div className={cx('product_price')}>
                        <p className={cx('new_price')}>{new_price_formatted} đ</p>
                        <p className={cx('old_price')}>{old_price_formatted} đ</p>
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
                <p className={cx('total')}>{total_price_formatted} đ</p>
                <FontAwesomeIcon
                    className={cx('trash_icon')}
                    icon={faTrashCan}
                    onClick={() => handleDeleteProduct(bookData.id)}
                />
            </div>
        </div>
    );
}

export default CartItem;
