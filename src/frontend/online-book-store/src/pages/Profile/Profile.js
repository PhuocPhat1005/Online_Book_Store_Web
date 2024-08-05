import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Profile.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import InputFieldItem from './components/InputFieldItem';
import SelectFieldItem from './components/SelectFieldItem';
import { COUNTRY, CITIES } from './components/Address';
import Portfolio from './components/Portfolio';
import assets from '~/assets';

const cx = classNames.bind(styles);

function Profile() {
    const [cityData, setCityData] = useState('');

    const handleCityData = (cityname) => {
        setCityData(cityname);
    };

    const fakeHandleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            username: formData.get('username'),
            fullname: formData.get('fullname'),
            emailaddress: formData.get('emailaddress'),
            address: formData.get('address'),
            country: formData.get('country'),
            city: formData.get('city'),
            province: formData.get('province'),
            aboutme: formData.get('aboutme'),
        };

        console.log(data);
    };

    return (
        <form className={cx('wrapper')} onSubmit={fakeHandleSubmit}>
            {/* <input type="submit" value="Sbubmit Button" /> */}
            <Image className={cx('background')} src={assets.default_background} alt="background" />
            <div className={cx('core')}>
                <div className={cx('information')}>
                    <div className={cx('infor_header')}>
                        <p className={cx('infor_header_title')}>My account</p>
                        <Button className={cx('infor_profile_edit')} types="text">
                            Edit
                        </Button>
                    </div>
                    <div className={cx('infor_body')}>
                        <div className={cx('input_field')}>
                            <p className={cx('input_field_title')}>user information</p>
                            <div className={cx('section_one')}>
                                <InputFieldItem _name="username" label={'Username'} placeholder={'e.g, Mr.Hello123'} />
                                <InputFieldItem
                                    _name="fullname"
                                    label={'Fullname'}
                                    placeholder={'e.g, John Felix Anthony Cena Jr'}
                                />
                            </div>
                            <div className={cx('section_two')}>
                                <InputFieldItem
                                    _name="emailaddress"
                                    label={'Email address'}
                                    placeholder={'e.g, john@gmail.com'}
                                />
                            </div>
                        </div>
                        <div className={cx('input_field')}>
                            <p className={cx('input_field_title')}>contact information</p>
                            <div className={cx('section_one')}>
                                <InputFieldItem
                                    _name="address"
                                    label={'Address'}
                                    placeholder={'e.g, 227 Nguyen Van Cu'}
                                />
                            </div>
                            <div className={cx('section_two')}>
                                <SelectFieldItem
                                    _name="country"
                                    selectLabel={'Select country'}
                                    label={'Country'}
                                    data={COUNTRY}
                                />
                                <SelectFieldItem
                                    _name="city"
                                    selectLabel={'Select city'}
                                    label={'City'}
                                    data={CITIES}
                                    type="city"
                                    handleCityData={handleCityData}
                                />

                                {cityData && (
                                    <SelectFieldItem
                                        _name="province"
                                        selectLabel={'Select province'}
                                        label={'Province'}
                                        data={CITIES}
                                        type="province"
                                        cityData={cityData}
                                    />
                                )}
                                {!cityData && (
                                    <SelectFieldItem
                                        _name="province"
                                        selectLabel={'Select province'}
                                        label={'Province'}
                                        data={[]}
                                        type="province"
                                        cityData={cityData}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={cx('input_field')}>
                            <p className={cx('input_field_title')}>about me</p>
                            <div className={cx('section_one')}>
                                <textarea
                                    className={cx('aboutme_text')}
                                    name={cx('aboutme')}
                                    placeholder="Write something about yourself..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Portfolio />
            </div>
        </form>
    );
}

export default Profile;
