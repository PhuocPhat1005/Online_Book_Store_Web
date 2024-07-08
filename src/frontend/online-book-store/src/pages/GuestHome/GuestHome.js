import classNames from 'classnames/bind';

import { HeaderContentLayout } from '~/components/Layouts';
import styles from './GuestHome.module.scss';
import Slide from '~/components/Slide';
import ConnectedLine from '~/components/ConnectedLine';
import IntroductionBlock from '../GuestHome/components/GuestIntroductionBlock/GuestIntroductionBlock';
import GuestEventBlock from '../GuestHome/components/GuestEventBlock/GuestEventBlock';
import EventsContent from './components/GuestEventsContent';
import Header from '~/components/Layouts/DefaultLayout/Header/Header';

const cx = classNames.bind(styles);

const data = [
    'https://morgan-sindall-pztazn5y-media.s3.amazonaws.com/construction/images/OvCe_NCCLibrary_Early-Prieview-09-min.width-1600.jpg',
    'https://images.alphacoders.com/132/1326370.png',
    'https://cdn.mos.cms.futurecdn.net/jUMGw45Kcj8vgLmnP7HZxP.jpg',
];

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
                        <IntroductionBlock />
                    </div>
                    <ConnectedLine />
                    <div className={cx('events')}>
                        <GuestEventBlock />
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

export default GuestHome;
