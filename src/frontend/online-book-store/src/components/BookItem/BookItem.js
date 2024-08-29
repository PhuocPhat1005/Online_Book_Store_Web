import classNames from 'classnames/bind';

import styles from './BookItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function BookItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.Book_ava} alt="avatar" />
            <div className={cx('information')}>
                <span className={cx('title')}>{data.Book_name}</span>
                <span className={cx('description')}>{data.Book_description}</span>
            </div>
        </div>
    );
}

export default BookItem;
