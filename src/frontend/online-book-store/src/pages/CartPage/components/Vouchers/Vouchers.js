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
    const [appliedVoucher, setAppliedVoucher] = useState([]);

    const handleAppliedVoucher = (voucherId) => {
        if (appliedVoucher.find((item) => item === voucherId)) {
            setAppliedVoucher((_) => appliedVoucher.filter((item) => item !== voucherId));
        } else {
            setAppliedVoucher([voucherId]);
        }
    };

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
                    <VoucherItem
                        data={item}
                        key={index}
                        handleDiscountVoucher={handleDiscountVoucher}
                        appliedVoucher={handleAppliedVoucher}
                        isApplied={appliedVoucher.includes(item.id)}
                    />
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
