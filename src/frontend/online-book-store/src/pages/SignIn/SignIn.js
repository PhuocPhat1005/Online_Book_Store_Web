import classNames from 'classnames/bind';
import { useState } from 'react';

import Image from '~/components/Image';
import images from '~/assets';
import styles from './SignIn.module.scss';
import Button from '~/components/Button';
import IncorrectBox from '~/components/IncorrectBox';
import SendEmail from '~/components/SendEmail';
import GoogleRegister from '~/components/GoogleRegister';

import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';

import request from '~/utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SignIn() {
    const [toggleToast, setToggleToast] = useState(true);
    const [inCorrectMess, setIncorrectMess] = useState('');
    const navigate = useNavigate();
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const signin_data = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        try {
            const response = await request.post('auth/sign_in', signin_data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status === 200) {
                // Handle successful form submission
                setToggleToast(true);
                console.log('Form submitted successfully');

                navigate(config.routes.home);
            } else {
                // Handle errors
                setToggleToast(false);
                console.error('Form submission failed', response.data);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Form submission failed', error.response.data);

                setToggleToast(false);
                setIncorrectMess(error.response.data.detail);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
        }
    };

    const handleToast = () => {
        if (inCorrectMess === '') return;
        setToggleToast(true);
    };

    const closeIncorrectBox = () => {
        setToggleToast(true);
        setIncorrectMess('');
    };

    const handleResetPassword = () => {
        setIsForgotPassword(!isForgotPassword);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={config.routes.home} className={cx('header-item')}>
                    <FontAwesomeIcon className={cx('header-icon')} icon={faHouse} />
                </Link>
                <Link to={config.routes.signup} className={cx('header-item')}>
                    <FontAwesomeIcon className={cx('header-icon')} icon={faRightToBracket} />
                </Link>
            </div>
            <div className={cx('image-container')}>
                <Image className={cx('background')} src={images.signin} />
                <div className={cx('overlay')}></div>
            </div>
            <form className={cx('signin-form')} onSubmit={handleSubmit}>
                <div className={cx('form-container')}>
                    <div className={cx('title')}>
                        <p className={cx('label')}>sign in</p>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('input-field')}>
                            <p className={cx('input-label')}>Username</p>
                            <input
                                className={cx('input-bar')}
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className={cx('input-field')}>
                            <p className={cx('input-label')}>Password</p>
                            <input
                                className={cx('input-bar')}
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('remember-password')}>
                                <input className={cx('remember-check')} type="checkbox" />
                                <span className={cx('info-text')}>Remember me</span>
                            </div>
                            <span className={cx('info-text')} onClick={handleResetPassword}>
                                Forgot password?
                            </span>
                        </div>
                        <Button className={cx('submit-btn')} onClick={handleToast}>
                            Sign In
                        </Button>
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('footer-container')}>
                            <Link to={config.routes.signup} className={cx('signup-text')}>
                                Don't have an account? Sign Up now
                            </Link>
                            <GoogleRegister />
                        </div>
                    </div>
                </div>
            </form>
            {isForgotPassword && <SendEmail handleResetPassword={handleResetPassword} />}
            {!toggleToast && <IncorrectBox mess={inCorrectMess} onClose={closeIncorrectBox} />}
        </div>
    );
}

export default SignIn;
