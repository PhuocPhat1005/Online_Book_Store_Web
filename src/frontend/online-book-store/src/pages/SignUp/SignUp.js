import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Image from '~/components/Image';
import images from '~/assets';
import styles from './SignUp.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from 'react-router-dom';
import request from '~/utils/request';
import config from '~/config';
import CorrectBox from '~/components/CorrectBox';
import IncorrectBox from '~/components/IncorrectBox';
import Loading from './Loading';

const cx = classNames.bind(styles);

function SignUp() {
    const [isSuccessfulSignUp, setIsSuccessfulSignup] = useState(false);
    const [toggleToast, setToggleToast] = useState(true);
    const [inCorrectMess, setIncorrectMess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const correctMess = 'Sign up an account successfully';
    const navigate = useNavigate();

    const [passwordResult, setPasswordResult] = useState('');
    const [confirmPasswordResult, setConfirmPasswordResult] = useState('');
    const equalPassword = passwordResult === confirmPasswordResult;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target);
        const signup_data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            if (!equalPassword) {
                throw new Error('Invalid password');
            }

            const response = await request.post('auth/sign_up', signup_data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Handle successful form submission
                setIsSuccessfulSignup(true);
                setIsLoading(false);
                console.log('Form submitted successfully');
            } else {
                // Handle errors
                setToggleToast(false);
                console.error('Form submission failed', response.data);
            }
        } catch (error) {
            setIsLoading(false);

            if (error.message === 'Invalid password') {
                setToggleToast(false);
                setIncorrectMess('Invalid password');
            } else if (error.response) {
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

    const closeBox = () => {
        setToggleToast(true);
        setIncorrectMess('');
    };

    useEffect(() => {
        if (isSuccessfulSignUp) {
            navigate(config.routes.signin);
        }
    }, [isSuccessfulSignUp, navigate]);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Link to={config.routes.signin} className={cx('header-item')}>
                        <FontAwesomeIcon className={cx('header-icon', 'sign-in-icon')} icon={faRightToBracket} />
                    </Link>
                </div>
                <div className={cx('image-container')}>
                    <Image className={cx('background')} src={images.signin} />
                    <div className={cx('overlay')}></div>
                </div>
                <form className={cx('signin-form')} onSubmit={handleSubmit}>
                    <div className={cx('form-container')}>
                        <div className={cx('title')}>
                            <p className={cx('label')}>sign up</p>
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
                                <p className={cx('input-label')}>Email</p>
                                <input
                                    className={cx('input-bar')}
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address (eg. email_name@gmail.com)"
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
                                    onChange={(e) => setPasswordResult(e.target.value)}
                                />
                            </div>
                            <div className={cx('input-field')}>
                                <p className={cx('input-label')}>Confirm Password</p>
                                <input
                                    className={cx('input-bar')}
                                    type="password"
                                    name="confirm"
                                    placeholder="Confirm your password"
                                    required
                                    onChange={(e) => setConfirmPasswordResult(e.target.value)}
                                />
                            </div>
                            <Button className={cx('submit-btn')} onClick={handleToast}>
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </form>
                {!toggleToast && <IncorrectBox mess={inCorrectMess} onClose={closeBox} />}
                {isSuccessfulSignUp && <CorrectBox mess={correctMess} onClose={closeBox} />}
            </div>
            {isLoading && (
                <div className={cx('overlay_loading')}>
                    <div className={cx('loading_container')}>
                        <p className={cx('loading_text')}>Loading</p>
                        <Loading className={cx('loading_circle')} />
                    </div>
                </div>
            )}
        </>
    );
}

export default SignUp;
