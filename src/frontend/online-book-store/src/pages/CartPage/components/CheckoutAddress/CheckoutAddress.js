import classNames from 'classnames/bind';
import styles from './CheckoutAddress.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';
import AddNewAddress from '../AddNewAddress';

const cx = classNames.bind(styles);

function CheckoutAddress({ handlePopupcheckout }) {
    // Call API to get previous addresses
    // seach previous address, i will add a pair: isChosen: true/ false, by default, the first element has this property is true.

    const [isChosen, setIsChosen] = useState(false);
    const [isAddNewAddress, setIsAddNewAddress] = useState(false);

    const handleIsChosen = () => {
        setIsChosen(!isChosen);
    };

    const handleSubmitDone = () => {};

    const handleAddNewAddress = () => {
        setIsAddNewAddress(!isAddNewAddress);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <p className={cx('header_title')}>Choose your address</p>
                </div>
                <div className={cx('body')}>
                    <div className={cx('address_item')}>
                        <div className={cx('user_information')}>
                            <div className={cx('user_contact_info')}>
                                <p className={cx('username')}>John</p>
                                <p className={cx('phone_number')}>0123456789</p>
                            </div>
                            <p className={cx('address')}>12/3A Qwerty St., Ward Poiu, Dist. 4, QAZ</p>
                        </div>
                        {!isChosen && (
                            <Button className={cx('default_btn')} types="text" onClick={handleIsChosen}>
                                Choose
                            </Button>
                        )}
                        {isChosen && <p className={cx('address_default_text')}>Default</p>}
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Button className={cx('add_new_address_btn')} onClick={handleAddNewAddress}>
                        Add new address
                    </Button>
                    <div className={cx('buttons')}>
                        <Button className={cx('footer_btn', { cancel: true })} onClick={handlePopupcheckout}>
                            Cancel
                        </Button>
                        <Button className={cx('footer_btn')} onClick={handleSubmitDone}>
                            Done
                        </Button>
                    </div>
                </div>
            </div>
            {isAddNewAddress && <AddNewAddress closeAddNewAddress={handleAddNewAddress} />}
        </>
    );
}

export default CheckoutAddress;
