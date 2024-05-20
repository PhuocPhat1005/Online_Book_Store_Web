import classNames from 'classnames/bind';

import { HeaderContentLayout } from '~/components/Layouts';
import styles from './Home.module.scss';
import Slide from '~/components/Slide';
import ConnectedLine from '~/components/ConnectedLine';
import IntroductionBlock from './components/IntroductionBlock';
import EventBlock from './components/EventBlock';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const data = [
    'https://morgan-sindall-pztazn5y-media.s3.amazonaws.com/construction/images/OvCe_NCCLibrary_Early-Prieview-09-min.width-1600.jpg',
    'https://images.alphacoders.com/132/1326370.png',
    'https://cdn.mos.cms.futurecdn.net/jUMGw45Kcj8vgLmnP7HZxP.jpg',
];

function Home() {
    return (
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
            <ConnectedLine />
            <ConnectedLine />
        </div>
    );
}

export default Home;
