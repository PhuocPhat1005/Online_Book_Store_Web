import classNames from 'classnames/bind';

import styles from './ProductItem.module.scss';
import Image from '~/components/Image';
import assets from '~/assets';

const cx = classNames.bind(styles);

function ProductItem({ data, rating = 0 }) {
    rating = '4.25';
    const totalRating = 5;
    let int = parseInt(rating[0]);
    let decimal = parseFloat(rating.substr(1));

    let newPrice = data.price.toString();
    let oldPrice = '120';
    let discount = Math.round((1 - 100 / 120) * 100);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image_container')}>
                <Image
                    className={cx('image')}
                    src="https://play-lh.googleusercontent.com/gwZxofR0K4lpyeOLB0LjirT5SKpJhAXz8yhp0kfnTzzihlDuR49BFEcKe2PXg4NF1KdB"
                    alt=""
                />
                <div className={cx('info')}>
                    <span className={cx('text')}>more information</span>
                </div>
            </div>
            <div className={cx('body')}>
                <p className={cx('title')}>{data.book_name}</p>
                <div className={cx('price')}>
                    <p className={cx('new_price')}>{newPrice} đ</p>
                    <p className={cx('old_price')}>{oldPrice} đ</p>
                    <div className={cx('discount')}>
                        <span className={cx('discount_text')}>{discount}%</span>
                    </div>
                </div>
                <p className={cx('description_text')}>{data.description}</p>
                <div className={cx('footer')}>
                    <div className={cx('stars_container')}>
                        {Array.from({ length: totalRating }, (_, index) => {
                            const rate = int / (index + 1);

                            if (index + 1 >= int + 2) {
                                decimal = 0;
                            }

                            return (
                                <Image
                                    className={cx('star_icon', {
                                        filled: rate >= 1,
                                        aquarter: rate < 1 && decimal > 0 && decimal <= 0.25,
                                        ahalf: rate < 1 && decimal > 0.25 && decimal <= 0.5,
                                        threequarters: rate < 1 && decimal > 0.5,
                                    })}
                                    src={assets.star_icon}
                                    alt="star_icon"
                                    key={index}
                                />
                            );
                        })}
                    </div>
                    <div className={cx('sold')}>
                        <p className={cx('sold_text')}>Sold:</p>
                        <p className={cx('sold_number')}>100</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
