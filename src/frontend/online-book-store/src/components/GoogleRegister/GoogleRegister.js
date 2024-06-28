import classNames from 'classnames/bind';

import styles from './GoogleRegister.module.scss';
import request from '~/utils/request';
import Image from '~/components/Image';
import assets from '~/assets';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function GoogleRegister() {
    const handleRegister = async () => {
        try {
            const response = await request.get('auth/login/google');

            if (response.status === 200) {
                console.log('Register successfully');
                const googleAuthUrl = response.data.google_auth_url._headers.location;

                googleAuthUrl
                    ? window.open(googleAuthUrl, '_blank')
                    : console.error('No URL received for Google login');
            } else {
                console.error('Register failed');
            }
        } catch (error) {
            if (error.response) {
                console.error('Register failed with,', error.response.data);
            } else if (error.request) {
                console.error('No response received', error.request);
            } else {
                console.error('Error', error.message);
            }
        }
    };

    useEffect(() => {
        const handleRegisterCallback = async () => {
            try {
                const response = await request.get('auth/google-callback');

                const { access_token, refresh_token } = response.data;
                console.log(access_token, refresh_token);

                if (response.status === 200) {
                    console.log('(callback) Register successfully');
                    console.log(response.data);
                } else {
                    console.error('(callback) Register failed');
                }
            } catch (error) {
                if (error.response) {
                    console.error('(callback) Register failed with,', error.response.data);
                } else if (error.request) {
                    console.error('(callback) No response received', error.request);
                } else {
                    console.error('(callback) Error', error.message);
                }
            }
        };
        handleRegisterCallback();
    }, []);

    return (
        <div className={cx('gg-signup')}>
            <Image className={cx('gg-logo')} src={assets.google_logo} />
            <p className={cx('signup-text')} onClick={handleRegister}>
                Sign Up with Google
            </p>
        </div>
    );
}

export default GoogleRegister;
