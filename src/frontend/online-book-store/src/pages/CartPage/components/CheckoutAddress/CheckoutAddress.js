import classNames from 'classnames/bind';
import styles from './CheckoutAddress.module.scss';
import Button from '~/components/Button';
import { useState, useEffect } from 'react';
import AddNewAddress from '../AddNewAddress';
import request from '~/utils/request';
import Cookies from 'universal-cookie';

const cx = classNames.bind(styles);

function CheckoutAddress({ handlePopupcheckout, setAddressId }) {
    // Call API to get previous addresses
    // seach previous address, i will add a pair: isChosen: true/ false, by default, the first element has this property is true.

    const [chooseAddress, setChooseAddress] = useState([]);
    const [isAddNewAddress, setIsAddNewAddress] = useState(false);
    const [allAddress, setAllAddress] = useState([]);
    // const [selectedAddress, setSelectedAddress] = useState({});

    const handlechooseAddress = (address) => {
        setChooseAddress((_) => {
            if (!chooseAddress.includes(address)) {
                return [address];
            }
        });
        setAddressId(address.address_id);
        // setSelectedAddress(address);
    };

    const handleAddNewAddress = () => {
        setIsAddNewAddress(!isAddNewAddress);
    };

    useEffect(() => {
        const fetchAllAddress = async () => {
            const cookies = new Cookies();
            const access_token = cookies.get('jwt_authorization');

            try {
                const response = await request.get(`address/get_user_address?access_token=${access_token}`);
                setChooseAddress([response.data[0]]);
                setAddressId(response.data[0].address_id);
                setAllAddress(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllAddress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     setAddressId(selectedAddress.id);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectedAddress]);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <p className={cx('header_title')}>Choose your address</p>
                </div>
                <div className={cx('body')}>
                    {allAddress.map((item, index) => (
                        <div className={cx('address_item')}>
                            <div className={cx('user_information')} key={index}>
                                <div className={cx('user_contact_info')}>
                                    <p className={cx('username')}>John</p>
                                    <p className={cx('phone_number')}>0123456789</p>
                                </div>
                                <p className={cx('address')}>
                                    {item.address}, {item.ward}, {item.district}, {item.province}, {item.country}
                                </p>
                            </div>
                            {chooseAddress &&
                                chooseAddress.find((address) => address.address_id !== item.address_id) && (
                                    <Button
                                        className={cx('default_btn')}
                                        types="text"
                                        onClick={() => handlechooseAddress(item)}
                                    >
                                        Choose
                                    </Button>
                                )}
                            {chooseAddress &&
                                chooseAddress.find((address) => address.address_id === item.address_id) && (
                                    <p className={cx('address_default_text')}>Default</p>
                                )}
                        </div>
                    ))}
                </div>
                <div className={cx('footer')}>
                    <Button className={cx('add_new_address_btn')} onClick={handleAddNewAddress}>
                        Add new address
                    </Button>
                    <div className={cx('buttons')}>
                        <Button className={cx('footer_btn', { cancel: true })} onClick={handlePopupcheckout}>
                            Cancel
                        </Button>
                        <Button className={cx('footer_btn')} onClick={handlePopupcheckout}>
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
