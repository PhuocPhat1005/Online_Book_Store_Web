import classNames from 'classnames/bind';
import styles from './Voucher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import VoucherItem from '../VoucherItem';

const cx = classNames.bind(styles);

function Vouchers() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <FontAwesomeIcon className={cx('voucher_icon')} icon={faTicket} />
                <p className={cx('header_title')}>Vouchers</p>
            </div>
            <div className={cx('body')}>
                <VoucherItem />
                <VoucherItem />
                <VoucherItem />
                <VoucherItem />
            </div>
            <div className={cx('footer')}>
                <p className={cx('footer_title')}>Attention:</p>
                <p className={cx('footer_text')}>
                    These vouchers can be applied to many different bills but you can only apply one voucher to one
                    bill.
                </p>
            </div>
        </div>
    );
}

export default Vouchers;
