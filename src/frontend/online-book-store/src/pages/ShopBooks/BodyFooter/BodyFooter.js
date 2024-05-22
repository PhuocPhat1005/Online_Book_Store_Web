import classNames from 'classnames/bind';
import styles from './BodyFooter.module.scss';
import Button from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);

function BodyFooter() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <p className={cx('title')}>Didn't find what you were looking for?</p>
                <p className={cx('description')}>This is just a small selection of the thousands of books we stock.</p>
                <p className={cx('description')}>
                    To place order for a book not listed,
                    <Button className={cx('btn-link')} to={config.routes.contact} target="_blank">
                        send us a enquiry via email
                    </Button>
                    and we'll get back to you with availability and shipping cost.
                </p>
            </div>
        </div>
    );
}

export default BodyFooter;
