import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './GuestDetailsBook.module.scss';
import Header from '~/components/Layouts/DefaultLayout/Header';
import GuestFooter from '~/components/Layouts/DefaultLayout/GuestFooter';
import PopUp from '~/components/PopUp';

import Image from '~/components/Image';
import Button from '~/components/Button';
import RatingStar from '~/components/RatingStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCircleInfo, faHeart } from '@fortawesome/free-solid-svg-icons';
import assets from '~/assets';

import Cookies from 'universal-cookie';
import request from '~/utils/request';

const cx = classNames.bind(styles);

function addDotsToNumber(number) {
    // Convert the number to a string and use a regular expression to add dots
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function GuestDetailsBook() {
    // State to manage whether the PopUp is shown
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    // Open & close PopUp
    const handleButtonClick = () => {
        setIsPopUpVisible(true);
    };
    const handleClosePopUp = () => {
        setIsPopUpVisible(false);
    };

    const location = useLocation();
    let data = location.state?.bookData;

    let discount_percentage = 0;
    const rating = data.rate.toString();
    let old_price = addDotsToNumber(data.price).toString();
    let new_price = addDotsToNumber(Math.round((data.price * (100 - discount_percentage)) / 100)).toString();

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

    useEffect(() => {
        if (isAddToCart) {
            const timer = setTimeout(() => {
                setIsAddToCart(false);
            }, 3000);
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [isAddToCart]);

    return (
        <>
            <Header guest={true} />
            <div className={cx('wrapper')}>
                <div className={cx('introduction')}>
                    <div className={cx('images_container')}>
                        <ul className={cx('images')}>
                            <li className={cx('image_item')}>
                                <Image className={cx('image')} src={data.book_ava} />
                            </li>
                            <li className={cx('image_item')}>
                                <Image className={cx('image')} src={data.book_ava} />
                            </li>
                            <li className={cx('image_item')}>
                                <Image className={cx('image')} src={data.book_ava} />
                            </li>
                            <li className={cx('extends')}>+10</li>
                        </ul>
                        <Image className={cx('main_image')} src={data.book_ava} />
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
                                    <span className={cx('item_value')}>{data.author[0].Full_name}</span>
                                </li>
                                <li className={cx('item_section_1')}>
                                    Translators:
                                    <span className={cx('item_value')}>Nguyễn Văn Phước</span>
                                </li>
                            </ul>
                            <ul className={cx('section_2')}>
                                <li className={cx('item_section_2')}>
                                    Cover type:
                                    <span className={cx('item_value')}>{data.book_cover_type}</span>
                                </li>
                                <li className={cx('item_section_2')}>
                                    Language:
                                    <span className={cx('item_value')}>{data.language}</span>
                                </li>
                                <li className={cx('item_section_2')}>
                                    Page numbers:
                                    <span className={cx('item_value')}>{data.page_number}</span>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('ratings')}>
                            <RatingStar rating={rating} width={24} height={24} />
                            <span className={cx('rating_text')}>{rating} stars</span>
                        </div>
                        <div className={cx('prices')}>
                            <span className={cx('new_price')}>{new_price} đ</span>
                            <span className={cx('old_price')}>{old_price} đ</span>
                            <span className={cx('discount')}>-{discount_percentage}%</span>
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
                    <Button onClick={handleButtonClick} className={cx('add_to_cart_btn')} types="text">
                        Add to cart
                    </Button>
                    <Button onClick={handleButtonClick} className={cx('buy_now_btn')} types="text">
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
                                <span className={cx('details_item_value')}>{data.book_name}</span>
                            </li>
                            <li className={cx('details_item')}>
                                <span className={cx('details_item_label')}>Author:</span>
                                <span className={cx('details_item_value')}>{data.author[0].Full_name}</span>
                            </li>
                            <li className={cx('details_item')}>
                                <span className={cx('details_item_label')}>Publisher:</span>
                                <span className={cx('details_item_value')}>Nha Xuat Ban Tong Hop</span>
                            </li>
                            <li className={cx('details_item')}>
                                <span className={cx('details_item_label')}>Size:</span>
                                <span className={cx('details_item_value')}>{data.book_size} cm</span>
                            </li>
                            <li className={cx('details_item')}>
                                <span className={cx('details_item_label')}>Number of pages</span>
                                <span className={cx('details_item_value')}>{data.page_number}</span>
                            </li>
                            <li className={cx('details_item')}>
                                <span className={cx('details_item_label')}>ISBN</span>
                                <span className={cx('details_item_value')}>{data.isbn}</span>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('product_infomation')}>
                        <div className={cx('information_title_wrap')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faCircleInfo} />
                            <span className={cx('information_text')}>product information</span>
                        </div>
                        <p className={cx('information_paragraph')}>{data.description}</p>
                    </div>
                </div>
                <div className={cx('ratings_all')}>
                    <div className={cx('ratings_title_wrap')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
                        <span className={cx('ratings_text')}>ratings & comments</span>
                    </div>
                    <div className={cx('ratings_rate')}>
                        <div className={cx('rating_rate_section_1')}>
                            <div className={cx('rating_rate_valuation')}>
                                <p className={cx('ratings_rate_value')}>{rating}</p>
                                <p className={cx('ratings_rate_subvalue')}>/5</p>
                            </div>
                            <p className={cx('ratings_rate_based')}>based on {data.amount_rate} reviews</p>
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
                    <ul className={cx('comments_list')}>
                        <li className={cx('comments_item')}>
                            <div className={cx('comments_item_header')}>
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
                            <div className={cx('comments_item_header')}>
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
                        <div className={cx('post_comments_header')}>
                            <Image className={cx('user_avatar')} src={assets.default_avartar} />
                            <span className={cx('user_name_post')}>Anonymous</span>
                            <RatingStar rating={'0'} width={16} height={16} />
                        </div>
                        <textarea className={cx('comments_text')} name="comments_text"></textarea>
                    </div>
                </div>
                {/* Change Button's onClick to trigger the PopUp */}
                <Button onClick={handleButtonClick} className={cx('cmt-more-btn')} types="findmore">
                    Comment about this product
                </Button>
                {/* Render PopUp conditionally based on the state */}
                {isPopUpVisible && <PopUp onClose={handleClosePopUp} />}
            </div>
            <GuestFooter />
        </>
    );
}

export default GuestDetailsBook;
