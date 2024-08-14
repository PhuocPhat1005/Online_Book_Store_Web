import classNames from 'classnames/bind';

import { HeaderContentLayout } from '~/components/Layouts';
import styles from './GuestHome.module.scss';
import Slide from '~/components/Slide';
import ConnectedLine from '~/components/ConnectedLine';
import GuestIntroductionBlock from '../GuestHome/components/GuestIntroductionBlock/GuestIntroductionBlock';
import GuestEventBlock from '../GuestHome/components/GuestEventBlock/GuestEventBlock';
import GuestEventsContent from './components/GuestEventsContent';
import Header from '~/components/Layouts/DefaultLayout/Header/Header';
import assets from '~/assets';

const cx = classNames.bind(styles);

const data = [assets.homepage_banner_1, assets.homepage_banner_2, assets.homepage_banner_3];

function GuestHome() {
    return (
        <>
            <Header guest={true} />
            <div className={cx('wrapper')}>
                <HeaderContentLayout title="SIBooks" subtitle="The World of Books" guest />
                <Slide images={data} />
                <ConnectedLine />
                <div className={cx('container')}>
                    <div className={cx('introduction')}>
                        <GuestIntroductionBlock />
                    </div>
                    <ConnectedLine />
                    <div className={cx('events')}>
                        <GuestEventBlock />
                    </div>
                    <ConnectedLine />
                </div>
                <div id="EventsContent">
                    <GuestEventsContent />
                </div>
                <ConnectedLine />
                <ConnectedLine />
            </div>
        </>
    );
}

export default GuestHome;
