import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Voucher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import VoucherItem from '../VoucherItem';
import request from '~/utils/request';

const cx = classNames.bind(styles);

function Vouchers({ handleDiscountVoucher }) {
    const [allVouchers, setAllVouchers] = useState([]);

    useEffect(() => {
        const fetchAllVouchers = async () => {
            try {
                const response = await request.get('voucher/show_all_vouchers');

                if (response.status === 200) {
                    setAllVouchers(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllVouchers();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <FontAwesomeIcon className={cx('voucher_icon')} icon={faTicket} />
                <p className={cx('header_title')}>Vouchers</p>
            </div>
            <div className={cx('body')}>
                {allVouchers.map((item, index) => (
                    <VoucherItem data={item} key={index} handleDiscountVoucher={handleDiscountVoucher} />
                ))}
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
