import classNames from 'classnames/bind';
import styles from './VoucherItem.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function VoucherItem({ data, handleDiscountVoucher }) {
    const [openSeeMore, setOpenSeeMore] = useState(false);
    const [isApplied, setIsApplied] = useState(false);

    const handleOpenSeeMore = () => {
        setOpenSeeMore(!openSeeMore);
    };

    const handleIsApplied = () => {
        setIsApplied(!isApplied);
    };

    useEffect(() => {
        if (isApplied) {
            handleDiscountVoucher(data.discount);
        } else {
            handleDiscountVoucher(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isApplied]);

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <p className={cx('header_title')}>Voucher discount {data.discount}% on bills.</p>
                    <span className={cx('header_more')} onClick={handleOpenSeeMore}>
                        See more
                    </span>
                </div>
                <p className={cx('body')}>
                    Not Applicable to Foreign Literature, Manga, Gift Certificates, Textbooks, Calculator and Photo
                    Paper and Some Other Types of Paper and Boards
                </p>
                <div className={cx('footer')}>
                    <Button className={cx('apply_btn')} onClick={handleIsApplied}>
                        {isApplied && 'Applied'}
                        {!isApplied && 'Apply'}
                    </Button>
                </div>
            </div>
            {openSeeMore && (
                <div className={cx('overlay')}>
                    <div className={cx('container')}>
                        <div className={cx('voucher_detail_header')}>
                            <p className={cx('voucher_detail_header_title')}>conditions apply</p>
                            <FontAwesomeIcon className={cx('close_icon')} icon={faXmark} onClick={handleOpenSeeMore} />
                        </div>
                        <div className={cx('voucher_detail_body')}>
                            <div className={cx('voucher_detail_info')}>
                                <p className={cx('voucher_detail_info_header')}>Vouchers:</p>
                                <ul className={cx('voucher_list')}>
                                    <li className={cx('voucher_item')}>Voucher discount 10% on bills.</li>
                                    <li className={cx('voucher_item')}>Voucher discount 20% on bills.</li>
                                    <li className={cx('voucher_item')}>Voucher discount 25% on bills.</li>
                                    <li className={cx('voucher_item')}>Voucher discount 35% on bills.</li>
                                    <li className={cx('voucher_item')}>Voucher discount 50% on bills.</li>
                                </ul>
                            </div>
                            <div className={cx('voucher_detail_info')}>
                                <p className={cx('voucher_detail_info_header')}>Conditions:</p>
                                <p className={cx('voucher_detail_info_text')}>
                                    Conditions of application: Applicable to orders that do NOT include the value of
                                    Foreign Literature products, Manga, Gift Certificates, Textbooks, Computers and
                                    Photo Paper and Some Other Types of Paper and Boards
                                </p>
                            </div>
                            <div className={cx('voucher_detail_info')}>
                                <p className={cx('voucher_detail_info_header')}>Expiration:</p>
                                <p className={cx('voucher_detail_info_text')}>
                                    This voucher is available form {data.valid_from} to {data.valid_to}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VoucherItem;
