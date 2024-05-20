import classNames from 'classnames/bind';
import styles from './FAQItem.module.scss';

const cx = classNames.bind(styles);

function faqItem({ title, description }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>{title}</p>
            <p className={cx('description')}>{description}</p>
        </div>
    );
}

export default faqItem;
