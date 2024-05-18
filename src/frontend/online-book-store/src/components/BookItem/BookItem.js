import classNames from 'classnames/bind';

import styles from './BookItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function BookItem() {
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                src="https://bci.kinokuniya.com/jsp/images/book-img/20100/20100250/2010025063124.JPG"
                alt=""
            />
            <div className={cx('information')}>
                <span className={cx('title')}>Books Kinokuniya: Stand by Me Doraemon</span>
                <span className={cx('description')}>
                    In the suburbs of Tokyo sometime ago, there lived a clumsy boy about 10 years old. There appeared in
                    front of him a boy named Sewashi, Nobita's descendant of four generations later from the 22nd
                    century, and Doraemon, a 22nd century cat-type caretaker robot who helps people with its secret
                    gadgets.
                </span>
            </div>
        </div>
    );
}

export default BookItem;
