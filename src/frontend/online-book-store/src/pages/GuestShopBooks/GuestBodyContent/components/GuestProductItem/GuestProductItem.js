import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './GuestProductItem.module.scss';
import Image from '~/components/Image';
import config from '~/config';
import RatingStar from '~/components/RatingStar';
import BasicSpinner from '~/components/BasicSpinner';
import request from '~/utils/request';

const cx = classNames.bind(styles);

function addDotsToNumber(number) {
    // Convert the number to a string and use a regular expression to add dots
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function ProductItem({ data, rating = 0 }) {
    const [dataItem, setDataItem] = useState(data);

    rating = data.rate.toString();
    let discount_percentage = 0;
    let old_price = addDotsToNumber(data.price).toString();
    let new_price = addDotsToNumber(Math.round((data.price * (100 - discount_percentage)) / 100)).toString();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [statusFetchAuthor, setStatusFetchAuthor] = useState(false);

    const fetchAuthor = async () => {
        try {
            const response = await request.get(`book/get_book_author/${data.id}`);

            if (response.status === 200) {
                setDataItem({
                    ...dataItem,
                    author: response.data,
                });
                setStatusFetchAuthor(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProduct = async (e) => {
        e.preventDefault();

        // fetch to get authors, translators.
        setIsLoading(true);
        await fetchAuthor();
    };

    useEffect(() => {
        if (statusFetchAuthor) {
            setIsLoading(false);
            setStatusFetchAuthor(false);
            navigate(config.routes.guestdetailsbook, { state: { bookData: dataItem } });
        }
    }, [dataItem, navigate, statusFetchAuthor]);

    return (
        <>
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
                        <p className={cx('new_price')}>{new_price} đ</p>
                        <p className={cx('old_price')}>{old_price} đ</p>
                        <div className={cx('discount')}>
                            <span className={cx('discount_text')}>-{discount_percentage}%</span>
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
            {isLoading && (
                <div className={cx('overlay')}>
                    <BasicSpinner />
                </div>
            )}
        </>
    );
}

export default ProductItem;
