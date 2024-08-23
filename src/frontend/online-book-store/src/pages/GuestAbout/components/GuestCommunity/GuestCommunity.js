import classNames from 'classnames/bind';

import styles from './GuestCommunity.module.scss';
import Image from '~/components/Image';
import assets from '~/assets';

const cx = classNames.bind(styles);

function GuestCommunity() {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Our community</p>
            <div className={cx('body')}>
                <div className={cx('images')}>
                    <Image className={cx('community_img')} src={assets.aboutpage_community_3} alt="img_3" />
                    <Image className={cx('community_img')} src={assets.aboutpage_community_1} alt="img_1" />
                    <Image className={cx('community_img')} src={assets.aboutpage_community_2} alt="img_2" />
                </div>
                <div className={cx('info')}>
                    <p className={cx('info_text')}>
                        Our book store organizes a regular campaign every Sunday in our location where you guys can
                        share hobbies and stories.
                    </p>
                    <Image className={cx('info_img')} src={assets.aboutpage_community_4} alt="info_img" />
                </div>
            </div>
        </div>
    );
}

export default GuestCommunity;
