import classNames from 'classnames/bind';
import styles from './GuestShopBooks.module.scss';
import { HeaderContentLayout } from '~/components/Layouts';
import BodyContent from './GuestBodyContent';
import Header from '~/components/Layouts/DefaultLayout/Header';
import GuestFooter from '~/components/Layouts/DefaultLayout/GuestFooter';
import GuestConnectedLine from '~/components/GuestConnectedLine';

const cx = classNames.bind(styles);

function GuestShopBooks() {
    return (
        <>
            <Header guest={true} />
            <div className={cx('wrapper')}>
                <HeaderContentLayout title="Bookshop" subtitle="The Online" placementSubtitle="top" />
                <div className={cx('container')}>
                    <div className={cx('body')}>
                        <GuestConnectedLine />
                        <div className={cx('core')}>
                            <BodyContent />
                        </div>
                    </div>
                </div>
            </div>
            <GuestFooter />
        </>
    );
}

export default GuestShopBooks;
