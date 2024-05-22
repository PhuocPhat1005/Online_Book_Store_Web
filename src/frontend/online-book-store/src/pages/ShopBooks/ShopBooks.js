import classNames from 'classnames/bind';
import styles from './ShopBooks.module.scss';
import { HeaderContentLayout } from '~/components/Layouts';
import BodyHeading from './BodyHeading';
import ConnectedLine from '~/components/ConnectedLine';
import BodyContent from './BodyContent';
import BodyFooter from './BodyFooter';

const cx = classNames.bind(styles);

function ShopBooks() {
    return (
        <div className={cx('wrapper')}>
            <HeaderContentLayout title="Bookshop" subtitle="The Online" placementSubtitle="top" />
            <div className={cx('container')}>
                <div className={cx('body')}>
                    <BodyHeading />
                    <ConnectedLine />
                    <BodyContent />
                    <ConnectedLine />
                    <ConnectedLine />
                    <BodyFooter />
                </div>
                <ConnectedLine />
                <ConnectedLine />
            </div>
        </div>
    );
}

export default ShopBooks;
