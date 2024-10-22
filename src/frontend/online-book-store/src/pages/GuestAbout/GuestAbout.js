import classNames from 'classnames/bind';

import styles from './GuestAbout.module.scss';
import { HeaderContentLayout } from '~/components/Layouts';
import GuestConnectedLine from '~/components/GuestConnectedLine/GuestConnectedLine';
import Image from '~/components/Image';
import SubHeaderContentLayout from '~/components/Layouts/SubHeaderContentLayout';
import Member from './components/GuestMember';
import Location from './components/GuestLocation';
import Community from './components/GuestCommunity';
import Header from '~/components/Layouts/DefaultLayout/Header';
import GuestFooter from '~/components/Layouts/DefaultLayout/GuestFooter';

const cx = classNames.bind(styles);

function GuestAbout() {
    return (
        <>
            <Header guest={true} />
            <div className={cx('wrapper')}>
                <HeaderContentLayout title="About Us" subtitle="More than a just bookshop..." />
                <div className={cx('introduction')}>
                    <div className={cx('content')}>
                        <Image
                            className={cx('picture')}
                            src="https://wallpapers.com/images/featured/library-06bevz1z3e3tya3r.jpg"
                            alt=""
                        />
                        <div className={cx('information')}>
                            <span className={cx('text')}>
                                Welcome to our online bookstore, where every click opens the door to a world of literary
                                wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                                heartwarming romances. Join our vibrant community of readers, where discussions and
                                recommendations abound. Let us guide you on your literary journey, helping you find the
                                perfect book to escape into. Welcome to a place where stories come to life, just a click
                                away.
                            </span>
                        </div>
                    </div>
                </div>
                <GuestConnectedLine />
                <div className={cx('members')}>
                    <SubHeaderContentLayout title="Our Members" />
                    <div className={cx('members-container')}>
                        <Member
                            src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                            alt=""
                            name="Ngô Văn Khải"
                            description="Welcome to our online bookstore, where every click opens the door to a world of literary
                    wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                    heartwarming romances."
                        />
                        <Member
                            src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                            alt=""
                            name="Bùi Lê Khôi"
                            description="Welcome to our online bookstore, where every click opens the door to a world of literary
                        wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                        heartwarming romances."
                        />
                        <Member
                            src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                            alt=""
                            name="Lê Phước Phát"
                            description="Welcome to our online bookstore, where every click opens the door to a world of literary
                        wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                        heartwarming romances."
                        />
                        <Member
                            src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                            alt=""
                            name="Tô Quốc Thanh"
                            description="Welcome to our online bookstore, where every click opens the door to a world of literary
                        wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                        heartwarming romances."
                        />
                        <Member
                            src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                            alt=""
                            name="Thái Huyễn Tùng"
                            description="Welcome to our online bookstore, where every click opens the door to a world of literary
                        wonders. Dive into our extensive collection, ranging from thrilling mysteries to
                        heartwarming romances."
                        />
                    </div>
                </div>
                <GuestConnectedLine />
                <Location />
                <GuestConnectedLine />
                <Community />
                <GuestConnectedLine />
                <GuestConnectedLine />
            </div>
            <GuestFooter />
        </>
    );
}

export default GuestAbout;
