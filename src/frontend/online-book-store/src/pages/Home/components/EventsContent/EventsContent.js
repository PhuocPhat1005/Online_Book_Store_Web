import classNames from 'classnames/bind';

import styles from './EventsContent.module.scss';
import Image from '~/components/Image';
import assets from '~/assets';

const cx = classNames.bind(styles);

function EventsContent() {
    return (
        <div className={cx('container')}>
            <div className={cx('core')}>
                <div className={cx('side')}>
                    <div className={cx('side_wrapper')}>
                        <Image className={cx('img')} src={assets.homepage_img1} alt="img_1" />
                        <Image className={cx('img')} src={assets.homepage_img2} alt="img_2" />
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Events</div>
                    <div className={cx('content_body')}>
                        <div className={cx('text_item')}>
                            <p className={cx('text_item_label')}>Charity</p>
                            <ul className={cx('text_item_list')}>
                                <li className={cx('text')}>
                                    SIBOOKS focuses on supporting orphanages, charity schools, and those in poverty in
                                    the area surrounding remote regions in Vietnam. They make it easy for tourists and
                                    expats to visit local orphanages and contribute to the well-being of children.
                                </li>
                                <li className={cx('text')}>
                                    We have organized a special event on 29/ 02/ 2024 in Muong Cha, Dien Bien, Viet Nam
                                    to contribute educational books to children.
                                </li>
                                <li className={cx('text')}>
                                    Thanks for all customers and our community contributing to our campaigns.
                                </li>
                            </ul>
                        </div>
                        <div className={cx('text_item')}>
                            <p className={cx('text_item_label')}>Here, we go</p>
                            <ul className={cx('text_item_list')}>
                                <li className={cx('text')}>
                                    We will organize an offline meeting on 02 / 09 / 2025 with the collaboration with
                                    Starbucks so that you guys can enjoy the coffee while reading your favorite books.
                                </li>
                                <li className={cx('text')}>The event lasts for a week.</li>
                                <li className={cx('text')}>
                                    All profits will be donated to a charity fund that helps poor children in remote
                                    areas.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('footer_content')}>
                    <p className={cx('footer_text')}>Thanks for your supports !</p>
                    <p className={cx('footer_subtext')}>
                        Helping children with difficult conditions access knowledge is also our mission.
                    </p>
                </div>
                <Image className={cx('footer_img')} src={assets.homepage_footer_img} alt="footer_img" />
            </div>
        </div>
    );
}

export default EventsContent;
