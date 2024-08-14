import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DetailsBook.module.scss';

import Image from '~/components/Image';
import Button from '~/components/Button';
import RatingStar from '~/components/RatingStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCircleInfo, faHeart } from '@fortawesome/free-solid-svg-icons';
import assets from '~/assets';

const cx = classNames.bind(styles);

function DetailsBook() {
    const location = useLocation();
    const data = location.state?.bookData;

    const rating = '4.25';
    let new_price = '99.000';
    let old_price = '100.000';

    const [quantityValue, setQuantityValue] = useState(0);
    const [isAddToCart, setIsAddToCart] = useState(false);

    const handleQuantity = (descrease = false) => {
        if (descrease && quantityValue > 0) {
            setQuantityValue((prev) => parseInt(prev) - 1);
        } else if (!descrease) {
            setQuantityValue((prev) => parseInt(prev) + 1);
        }
    };

    const handleChangeQuantity = (value) => {
        if (value < 0) {
            value = 0;
        }
        setQuantityValue(value);
    };

    const handleClickAddToCart = () => {
        setIsAddToCart(!isAddToCart);
    };

    useEffect(() => {
        if (isAddToCart) {
            const timer = setTimeout(() => {
                setIsAddToCart(false);
            }, 3000);
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [isAddToCart]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('introduction')}>
                <div className={cx('images_container')}>
                    <ul className={cx('images')}>
                        <li className={cx('image_item')}>
                            <Image
                                className={cx('image')}
                                src="https://m.media-amazon.com/images/I/71vK0WVQ4rL._AC_UF1000,1000_QL80_.jpg"
                            />
                        </li>
                        <li className={cx('image_item')}>
                            <Image
                                className={cx('image')}
                                src="https://m.media-amazon.com/images/I/71vK0WVQ4rL._AC_UF1000,1000_QL80_.jpg"
                            />
                        </li>
                        <li className={cx('image_item')}>
                            <Image
                                className={cx('image')}
                                src="https://m.media-amazon.com/images/I/71vK0WVQ4rL._AC_UF1000,1000_QL80_.jpg"
                            />
                        </li>
                        <li className={cx('extends')}>+10</li>
                    </ul>
                    <Image
                        className={cx('main_image')}
                        src="https://m.media-amazon.com/images/I/71vK0WVQ4rL._AC_UF1000,1000_QL80_.jpg"
                    />
                </div>
                <div className={cx('description')}>
                    <h1 className={cx('title')}>{data.book_name}</h1>
                    <div className={cx('description_info')}>
                        <ul className={cx('section_1')}>
                            <li className={cx('item_section_1')}>
                                Supplier:
                                <span className={cx('item_value')}>Saigon Books</span>
                            </li>
                            <li className={cx('item_section_1')}>
                                Author:
                                <span className={cx('item_value')}>Dale Carnegie</span>
                            </li>
                            <li className={cx('item_section_1')}>
                                Translators:
                                <span className={cx('item_value')}>Nguyễn Văn Phước</span>
                            </li>
                        </ul>
                        <ul className={cx('section_2')}>
                            <li className={cx('item_section_2')}>
                                Cover type:
                                <span className={cx('item_value')}>Soft cover</span>
                            </li>
                            <li className={cx('item_section_2')}>
                                Language:
                                <span className={cx('item_value')}>Vietnamese</span>
                            </li>
                            <li className={cx('item_section_2')}>
                                Page numbers:
                                <span className={cx('item_value')}>500</span>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('ratings')}>
                        <RatingStar rating={rating} width={24} height={24} />
                        <span className={cx('rating_text')}>{rating} stars</span>
                    </div>
                    <div className={cx('prices')}>
                        <span className={cx('new_price')}>{new_price}</span>
                        <span className={cx('old_price')}>{old_price}</span>
                        <span className={cx('discount')}>-1%</span>
                    </div>
                    <div className={cx('quantity')}>
                        <label className={cx('quantity_label')} htmlFor="quantity_input">
                            Quantity:
                        </label>
                        <div className={cx('quantity_wrapper')}>
                            <span className={cx('quantity_add')} onClick={() => handleQuantity()}>
                                +
                            </span>
                            <input
                                className={cx('quantity_input')}
                                type="text"
                                name="quantity_input"
                                min="1"
                                max="5"
                                value={quantityValue}
                                onChange={(e) => handleChangeQuantity(e.target.value)}
                            />
                            <span className={cx('quantity_minus')} onClick={() => handleQuantity(true)}>
                                -
                            </span>
                        </div>
                        <span className={cx('available')}>
                            Avalaible:
                            <span className={cx('available_value')}>1000</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('payment_buttons')}>
                <Button className={cx('add_to_cart_btn')} types="text" onClick={handleClickAddToCart}>
                    Add to cart
                </Button>
                <Button className={cx('buy_now_btn')} types="text">
                    Buy now
                </Button>
            </div>
            <div className={cx('information')}>
                <div className={cx('product_details')}>
                    <div className={cx('information_title_wrap')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faBook} />
                        <span className={cx('details_text')}>product details</span>
                    </div>
                    <ul className={cx('details_list')}>
                        <li className={cx('details_item')}>
                            <span className={cx('details_item_label')}>Category:</span>
                            <span className={cx('details_item_value')}>Self Help</span>
                        </li>
                        <li className={cx('details_item')}>
                            <span className={cx('details_item_label')}>Title:</span>
                            <span className={cx('details_item_value')}>How to win friends and influences people.</span>
                        </li>
                        <li className={cx('details_item')}>
                            <span className={cx('details_item_label')}>Author:</span>
                            <span className={cx('details_item_value')}>Dale Carnegie</span>
                        </li>
                        <li className={cx('details_item')}>
                            <span className={cx('details_item_label')}>Publisher:</span>
                            <span className={cx('details_item_value')}>Nha Xuat Ban Tong Hop</span>
                        </li>
                        <li className={cx('details_item')}>
                            <span className={cx('details_item_label')}>Size:</span>
                            <span className={cx('details_item_value')}>10 x 15 cm</span>
                        </li>
                        <li className={cx('details_item')}>
                            <span className={cx('details_item_label')}>Number of pages</span>
                            <span className={cx('details_item_value')}>328</span>
                        </li>
                        <li className={cx('details_item')}>
                            <span className={cx('details_item_label')}>ISBN</span>
                            <span className={cx('details_item_value')}>12345678910jqka</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('product_infomation')}>
                    <div className={cx('information_title_wrap')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCircleInfo} />
                        <span className={cx('information_text')}>product information</span>
                    </div>
                    <p className={cx('information_paragraph')}>
                        Đắc Nhân Tâm - Được lòng người, là cuốn sách đưa ra các lời khuyên về cách thức cư xử, ứng xử và
                        giao tiếp với mọi người để đạt được thành công trong cuộc sống. Gần 80 năm kể từ khi ra đời, Đắc
                        Nhân Tâm là cuốn sách gối đầu giường của nhiều thế hệ luôn muốn hoàn thiện chính mình để vươn
                        tới một cuộc sống tốt đẹp và thành công. Đắc Nhân Tâm, từ một cuốn sách, hôm nay đã trở thành
                        một danh từ để chỉ một lối sống mà ở đó con người ta cư xử linh hoạt và thấu tình đạt lý. Lý
                        thuyết muôn thuở vẫn là những quy tắc chết, nhưng Nhân Tâm là sống, là biến đổi. Bạn hãy thử đọc
                        "Đắc Nhân Tâm" và tự mình chiêm nghiệm những cái đang diễn ra trong đời thực hiện hữu, chắc chắn
                        bạn sẽ có những bài học cho riêng mình.
                    </p>
                </div>
            </div>
            <div className={cx('ratings_all')}>
                <div className={cx('ratings_title_wrap')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
                    <span className={cx('ratings_text')}>ratings & commnets</span>
                </div>
                <div className={cx('ratings_rate')}>
                    <div className={cx('rating_rate_section_1')}>
                        <div className={cx('rating_rate_valuation')}>
                            <p className={cx('ratings_rate_value')}>{rating}</p>
                            <p className={cx('ratings_rate_subvalue')}>/5</p>
                        </div>
                        <p className={cx('ratings_rate_based')}>based on 203 reviews</p>
                        <RatingStar rating={rating} width={32} height={32} />
                    </div>
                    <div className={cx('rating_rate_section_2')}>
                        <ul className={cx('rating_bars')}>
                            <li className={cx('rating_bar')}>
                                <RatingStar rating={'5'} width={16} height={16} />
                                <div className={cx('bar')} style={{ '--dynamic-width': `${88.2}%` }}></div>
                                <span className={cx('percentage')}>88.2%</span>
                            </li>
                            <li className={cx('rating_bar')}>
                                <RatingStar rating={'4'} width={16} height={16} />
                                <div className={cx('bar')} style={{ '--dynamic-width': `${3.9}%` }}></div>
                                <span className={cx('percentage')}>3.9%</span>
                            </li>
                            <li className={cx('rating_bar')}>
                                <RatingStar rating={'3'} width={16} height={16} />
                                <div className={cx('bar')} style={{ '--dynamic-width': `${2.5}%` }}></div>
                                <span className={cx('percentage')}>2.5%</span>
                            </li>
                            <li className={cx('rating_bar')}>
                                <RatingStar rating={'2'} width={16} height={16} />
                                <div className={cx('bar')} style={{ '--dynamic-width': `${2.5}%` }}></div>
                                <span className={cx('percentage')}>2.5%</span>
                            </li>
                            <li className={cx('rating_bar')}>
                                <RatingStar rating={'1'} width={16} height={16} />
                                <div className={cx('bar')} style={{ '--dynamic-width': `${2.9}%` }}></div>
                                <span className={cx('percentage')}>2.9%</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={cx('comments')}>
                <ul className={cx('commnets_list')}>
                    <li className={cx('comments_item')}>
                        <div className={cx('commnets_item_header')}>
                            <Image className={cx('user_avatar')} src={assets.default_avartar} />
                            <div className={cx('comment_user_info')}>
                                <span className={cx('user_name')}>Tan Thanh Do</span>
                                <span className={cx('comment_time')}>05/ 08/ 2024 - 12:06</span>
                            </div>
                            <RatingStar rating={'5'} width={16} height={16} />
                        </div>
                        <span className={cx('comment_content')}>
                            This book is wonderful. Thanks to the author, now i have two girlfriends.
                        </span>
                    </li>
                    <li className={cx('comments_item')}>
                        <div className={cx('commnets_item_header')}>
                            <Image className={cx('user_avatar')} src={assets.default_avartar} />
                            <div className={cx('comment_user_info')}>
                                <span className={cx('user_name')}>Fat Lee</span>
                                <span className={cx('comment_time')}>05/ 08/ 2024 - 12:07</span>
                            </div>
                            <RatingStar rating={'1'} width={16} height={16} />
                        </div>
                        <span className={cx('comment_content')}>Xi pa sao ni ma chi li nu mu.</span>
                    </li>
                </ul>
                <div className={cx('post_comments')}>
                    <div className={cx('post_commnets_header')}>
                        <Image className={cx('user_avatar')} src={assets.default_avartar} />
                        <span className={cx('user_name_post')}>John</span>
                        <RatingStar rating={'1'} width={16} height={16} />
                    </div>
                    <textarea className={cx('commnets_text')} name="comments_text"></textarea>
                    <Button types="text" className={cx('post_btn')}>
                        post
                    </Button>
                </div>
            </div>
            {isAddToCart && (
                <div className={cx('add_to_cart_notification')}>
                    <p className={cx('notification_content')}>Add to cart successfully</p>
                </div>
            )}
        </div>
    );
}

export default DetailsBook;