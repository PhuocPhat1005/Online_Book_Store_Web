import classNames from 'classnames/bind';

import styles from './ProductItem.module.scss';
import Image from '~/components/Image';
import assets from '~/assets';

const cx = classNames.bind(styles);

function ProductItem({ rating }) {
    rating = '4.25';
    const totalRating = 5;
    let int = parseInt(rating[0]);
    let decimal = parseFloat(rating.substr(1));

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
                <p className={cx('title')}>Super Idol Ban Tum Lum Ta La, Messi vo dich Euro 2024</p>
                <div className={cx('price')}>
                    <p className={cx('new_price')}>99.000 đ</p>
                    <p className={cx('old_price')}>100.000 đ</p>
                    <div className={cx('discount')}>
                        <span className={cx('discount_text')}>-1%</span>
                    </div>
                </div>
                <p className={cx('description_text')}>
                    Đắc Nhân Tâm - Được lòng người, là cuốn sách đưa ra các lời khuyên về cách thức cư xử, ứng xử và
                    giao tiếp với mọi người để đạt được thành công trong cuộc sống. Gần 80 năm kể từ khi ra đời, Đắc
                    Nhân Tâm là cuốn sách gối đầu giường của nhiều thế hệ luôn muốn hoàn thiện chính mình để vươn tới
                    một cuộc sống tốt đẹp và thành công. Đắc Nhân Tâm, từ một cuốn sách, hôm nay đã trở thành một danh
                    từ để chỉ một lối sống mà ở đó con người ta cư xử linh hoạt và thấu tình đạt lý. Lý thuyết muôn thuở
                    vẫn là những quy tắc chết, nhưng Nhân Tâm là sống, là biến đổi. Bạn hãy thử đọc "Đắc Nhân Tâm" và tự
                    mình chiêm nghiệm những cái đang diễn ra trong đời thực hiện hữu, chắc chắn bạn sẽ có những bài học
                    cho riêng mình.
                </p>
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
