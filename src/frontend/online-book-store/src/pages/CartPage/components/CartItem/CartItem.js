import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CartItem() {
    return (
        <div className={cx('wrapper')}>
            <input className={cx('select_item')} type="checkbox" />
            <div className={cx('information')}>
                <Image
                    className={cx('product_img')}
                    src="https://play-lh.googleusercontent.com/gwZxofR0K4lpyeOLB0LjirT5SKpJhAXz8yhp0kfnTzzihlDuR49BFEcKe2PXg4NF1KdB"
                    alt="product_img"
                />
                <div className={cx('description')}>
                    <p className={cx('product_title')}>Super Idol Ban Tum Lum Ta La, Messi vo dich Euro 2024</p>
                    <div className={cx('product_price')}>
                        <p className={cx('new_price')}>99.000 đ</p>
                        <p className={cx('old_price')}>100.000 đ</p>
                    </div>
                </div>
            </div>
            <div className={cx('amount')}>
                <span className={cx('minus_btn')}>-</span>
                <span className={cx('amount_text')}>1</span>
                <span className={cx('adding_btn')}>+</span>
            </div>
            <div className={cx('total_price')}>
                <p className={cx('total')}>99.000 đ</p>
                <FontAwesomeIcon className={cx('trash_icon')} icon={faTrashCan} />
            </div>
        </div>
    );
}

export default CartItem;
