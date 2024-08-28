import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddNewAddress.module.scss';

import { Locations } from './Address';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import request from '~/utils/request';

import Cookies from 'universal-cookie';

const cx = classNames.bind(styles);

function AddNewAddress({ closeAddNewAddress }) {
    const cookies = new Cookies();
    const access_token = cookies.get('jwt_authorization');

    const { currentCities: CITIES } = Locations();

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');

    const [districtArray, setDistrictArray] = useState([]);
    const [wardArray, setWardArray] = useState([]);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await request.get(`address/show_all_districts?province_id=${selectedCity.id}`);

                if (response.status === 200) {
                    setDistrictArray(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchDistricts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity]);

    useEffect(() => {
        const fetchWards = async () => {
            try {
                const response = await request.get(`address/show_all_wards?district_id=${selectedDistrict.id}`);

                if (response.status === 200) {
                    setWardArray(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchWards();
    }, [selectedDistrict]);

    const handleSelectedCity = (event) => {
        const cityName = event.target.value;
        setSelectedCity((_) => CITIES.find((item) => item.province_name === cityName));
    };

    const handleSelectedDistrict = (event) => {
        const districtName = event.target.value;
        setSelectedDistrict((_) => districtArray.find((item) => item.district_name === districtName));
    };

    const handleSelectedWard = (event) => {
        const wardName = event.target.value;
        setSelectedWard((_) => wardArray.find((item) => item.ward_name === wardName));
    };

    /** Create Address */

    const handleAddressDetail = (event) => {
        setDetailedAddress(event.target.value);
    };

    const handleSubmitAddress = async () => {
        const newAddress = {
            access_token: access_token,
            address_detail: detailedAddress,
            ward_id: selectedWard.id,
        };
        try {
            await request.post(
                `address/create_address?access_token=${newAddress.access_token}&address_detail=${newAddress.address_detail}&ward_id=${newAddress.ward_id}`,
                null,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            closeAddNewAddress();
        } catch (error) {
            console.log(error);
        }
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
                            {CITIES.map((item, index) => (
                                <option key={index}>{item.province_name}</option>
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
                                <option key={index}>{item.district_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('address_infor_selection')}>
                        <p className={cx('address_infor_label')}>Ward</p>
                        <select
                            className={cx('address_selector')}
                            onChange={(event) => handleSelectedWard(event)}
                            disabled={!selectedDistrict}
                        >
                            {wardArray.map((item, index) => (
                                <option key={index}>{item.ward_name}</option>
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
                        value={detailedAddress}
                        onChange={handleAddressDetail}
                    />
                </div>
            </div>
            <div className={cx('add_new_address_footer')}>
                <Button className={cx('done_btn')} types="text" onClick={handleSubmitAddress}>
                    Done
                </Button>
            </div>
        </div>
    );
}

export default AddNewAddress;
