import classNames from 'classnames/bind';

import { HeaderContentLayout } from '~/components/Layouts';
import styles from './Home.module.scss';
import Slide from '~/components/Slide';
import ConnectedLine from '~/components/ConnectedLine';
import IntroductionBlock from './components/IntroductionBlock';
import EventBlock from './components/EventBlock';
import EventsContent from './components/EventsContent';
import Header from '~/components/Layouts/DefaultLayout/Header/Header';
import assets from '~/assets';

const cx = classNames.bind(styles);

const data = [assets.homepage_banner_1, assets.homepage_banner_2, assets.homepage_banner_3];

function Home() {
    return (
        <>
            <Header guest={false} />
            <div className={cx('wrapper')}>
                <HeaderContentLayout title="SIBooks" subtitle="The World of Books" />
                <Slide images={data} />
                <ConnectedLine />
                <div className={cx('container')}>
                    <div className={cx('introduction')}>
                        <IntroductionBlock />
                    </div>
                    <ConnectedLine />
                    <div className={cx('events')}>
                        <EventBlock />
                    </div>
                    <ConnectedLine />
                </div>
                <div id="EventsContent">
                    <EventsContent />
                </div>
                <ConnectedLine />
                <ConnectedLine />
            </div>
        </>
    );
}

export default Home;
