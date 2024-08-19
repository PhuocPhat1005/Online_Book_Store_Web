import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ProductItem.module.scss';
import Image from '~/components/Image';
import config from '~/config';
import RatingStar from '~/components/RatingStar';
import request from '~/utils/request';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ProductItem({ data, rating = 0 }) {
    const [dataItem, setDataItem] = useState(data);

    rating = '4.25';

    let newPrice = data.price.toString();
    let oldPrice = '120';
    let discount = Math.round((1 - 100 / 120) * 100);
    const navigate = useNavigate();

    const fetchProduct = (e) => {
        e.preventDefault();
        navigate(config.routes.detailsbook, { state: { bookData: dataItem } });

        // fetch to get authors, translators.
    };

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await request.get(`book/get_book_author/${data.id}`);

                if (response.status === 200) {
                    setDataItem({
                        ...dataItem,
                        author: response.data,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAuthor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.id]);

    return (
        <a href={`book/get_book/${data.id}`} className={cx('wrapper')} onClick={(e) => fetchProduct(e)}>
            <div className={cx('image_container')}>
                <Image className={cx('image')} src={data.book_ava} alt={data.book_name} />
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
