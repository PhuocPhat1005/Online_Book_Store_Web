import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddNewAddress.module.scss';

import { CITIES } from './Address';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AddNewAddress({ closeAddNewAddress }) {
    const [newAddress, setNewAddress] = useState({
        city: '',
        district: '',
        address: '',
    });

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');

    const city_array = CITIES.map((item) => item.city);
    const [districtArray, setDistrictArray] = useState([]);

    useEffect(() => {
        for (let item of CITIES) {
            if (item.city === selectedCity) {
                setDistrictArray(item.districts);
            }
        }
    }, [selectedCity]);

    const handleSelectedCity = (event) => {
        setSelectedCity(event.target.value);
    };
    const handleSelectedDistrict = (event) => {
        setSelectedDistrict(event.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('add_new_address_header')}>
                <p className={cx('add_new_address_header_title')}>Enter your information</p>
                <FontAwesomeIcon
                    className={cx('close_add_new_address_icon')}
                    icon={faXmark}
                    onClick={closeAddNewAddress}
                />
            </div>
            <div className={cx('add_new_address_body')}>
                <div className={cx('address_selection')}>
                    <div className={cx('address_infor_selection')}>
                        <p className={cx('address_infor_label')}>Province/ City</p>
                        <select className={cx('address_selector')} onChange={(event) => handleSelectedCity(event)}>
                            {city_array.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('address_infor_selection')}>
                        <p className={cx('address_infor_label')}>District</p>
                        <select
                            className={cx('address_selector')}
                            onChange={(event) => handleSelectedDistrict(event)}
                            disabled={!selectedCity}
                        >
                            {districtArray.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={cx('detailed_address')}>
                    <p className={cx('detailed_address_label')}>Specific Address</p>
                    <input
                        className={cx('input_detailed_address')}
                        type="text"
                        placeholder="Type your specific address"
                    />
                </div>
            </div>
            <div className={cx('add_new_address_footer')}>
                <Button className={cx('done_btn')} types="text">
                    Done
                </Button>
            </div>
        </div>
    );
}

export default AddNewAddress;
