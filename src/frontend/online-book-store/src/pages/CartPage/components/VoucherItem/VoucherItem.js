import classNames from 'classnames/bind';
import styles from './VoucherItem.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function VoucherItem() {
    const [openSeeMore, setOpenSeeMore] = useState(false);

    const handleOpenSeeMore = () => {
        setOpenSeeMore(!openSeeMore);
    };

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <p className={cx('header_title')}>Voucher discount 10.000 đ for bills above 100.000 đ</p>
                    <span className={cx('header_more')} onClick={handleOpenSeeMore}>
                        See more
                    </span>
                </div>
                <p className={cx('body')}>
                    Not Applicable to Foreign Literature, Manga, Gift Certificates, Textbooks, Calculator and Photo
                    Paper and Some Other Types of Paper and Boards
                </p>
                <div className={cx('footer')}>
                    <Button className={cx('apply_btn')}>Apply</Button>
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
                                    <li className={cx('voucher_item')}>
                                        Voucher discount 10.000 đ for bills above 100.000 đ
                                    </li>
                                    <li className={cx('voucher_item')}>
                                        Voucher discount 20.000 đ for bills above 300.000 đ
                                    </li>
                                    <li className={cx('voucher_item')}>
                                        Voucher discount 30.000 đ for bills above 500.000 đ
                                    </li>
                                    <li className={cx('voucher_item')}>
                                        Voucher discount 50.000 đ for bills above 800.000 đ
                                    </li>
                                    <li className={cx('voucher_item')}>
                                        Voucher discount 100.000 đ for bills above 1.000.000 đ
                                    </li>
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
                                    This voucher is available for 30 days left.
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
