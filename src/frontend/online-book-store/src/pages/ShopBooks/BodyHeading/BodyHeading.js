import classNames from 'classnames/bind';
import styles from './BodyHeading.module.scss';

const cx = classNames.bind(styles);

function BodyHeading() {
    return (
        <div className={cx('heading')}>
            <p className={cx('heading-title')}>
                Welcome to our digital shop window, a curated selection from the thousands of books we stock.
            </p>
            <div className={cx('heading-body')}>
                <p className={cx('heading-body-title')}>Tips for finding the books you want:</p>
                <ul className={cx('list')}>
                    <li className={cx('list-item')}>
                        <span className={cx('question')}>Know the type of book you're looking for? </span>
                        <span className={cx('suggest')}>Use the 'Bookshop Sections' filter.</span>
                    </li>
                    <li className={cx('list-item')}>
                        <span className={cx('question')}>Curious about what's been added recently? </span>
                        <span className={cx('suggest')}>Sort by 'Newest'.</span>
                    </li>
                    <li className={cx('list-item')}>
                        <span className={cx('question')}>Want for a specific book?</span>
                        <span className={cx('suggest')}>Use the Search bar in the header. </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BodyHeading;
