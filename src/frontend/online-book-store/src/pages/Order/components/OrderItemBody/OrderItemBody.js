import classNames from 'classnames/bind';
import styles from './OrderItemBody.module.scss';

import Image from '~/components/Image';

const cx = classNames.bind(styles);

function OrderItemBody({ className }) {
    return (
        <div
            className={cx('body', {
                [className]: className,
            })}
        >
            <div className={cx('product_details')}>
                <Image
                    className={cx('product_img')}
                    src="https://sibookspictures.s3.amazonaws.com/001-dac-nhan-tam/1-dac-nhan-tam-1.jpg"
                />
                <div className={cx('product_information')}>
                    <p className={cx('product_title')}>How to wins friends and influences people?</p>
                    <p className={cx('product_quantity')}>x 1</p>
                    <div className={cx('prices')}>
                        <p className={cx('new_price')}>99.000đ</p>
                        <p className={cx('old_price')}>100.000đ</p>
                    </div>
                </div>
            </div>
            <p className={cx('total_price_product')}>99.000đ</p>
        </div>
    );
}

export default OrderItemBody;
