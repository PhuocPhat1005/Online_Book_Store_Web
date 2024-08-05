import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ProductItem.module.scss';
import Image from '~/components/Image';
import config from '~/config';
import RatingStar from '~/components/RatingStar';

const cx = classNames.bind(styles);

function ProductItem({ data, rating = 0 }) {
    // if (data.images !== undefined) {
    //     if (data.images[0] !== undefined) {
    //         console.log('def');
    //     }
    // }
    rating = '4.25';

    let newPrice = data.price.toString();
    let oldPrice = '120';
    let discount = Math.round((1 - 100 / 120) * 100);
    const navigate = useNavigate();

    const fetchProduct = (e) => {
        e.preventDefault();
        navigate(config.routes.detailsbook, { state: { bookData: data } });

        // fetch to get authors, translators.
    };

    return (
        <a href={`book/get_book/${data.id}`} className={cx('wrapper')} onClick={(e) => fetchProduct(e)}>
            <div className={cx('image_container')}>
                <Image
                    className={cx('image')}
                    src={
                        data.images !== undefined
                            ? data.images[0] !== undefined
                                ? 'https://sibookspictures.s3.amazonaws.com/001-dac-nhan-tam/1-dac-nhan-tam-1.jpg'
                                : 'https://play-lh.googleusercontent.com/gwZxofR0K4lpyeOLB0LjirT5SKpJhAXz8yhp0kfnTzzihlDuR49BFEcKe2PXg4NF1KdB'
                            : 'https://play-lh.googleusercontent.com/gwZxofR0K4lpyeOLB0LjirT5SKpJhAXz8yhp0kfnTzzihlDuR49BFEcKe2PXg4NF1KdB'
                    }
                    alt={data.book_name}
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
                    <RatingStar rating={rating} />
                    <div className={cx('sold')}>
                        <p className={cx('sold_text')}>Sold:</p>
                        <p className={cx('sold_number')}>100</p>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default ProductItem;
