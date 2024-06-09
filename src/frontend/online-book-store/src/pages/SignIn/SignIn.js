import classNames from "classnames/bind";
import Image from "~/components/Image";
import images from '~/assets';
import styles from './SignIn.module.scss';
import Button from "~/components/Button";
import { Link } from "react-router-dom";
import config from "~/config";

import request from "~/utils/request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function SignIn() {

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const signup_data = {
            username: formData.get('username'),
            password: formData.get('password')
        };
    
        // console.log(signup_data);
    
        try {
            const response = await request.post('auth/sign_in', signup_data);
    
            if (response.status === 200) {
                // Handle successful form submission
                console.log('Form submitted successfully');
            } else {
                // Handle errors
                console.error('Form submission failed', response.data);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Form submission failed', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link className={cx('header-item')}>
                    <FontAwesomeIcon className={cx('header-icon')} icon={faHouse}/>
                </Link>
                <Link to={config.routes.signup} className={cx('header-item')}>
                    <FontAwesomeIcon className={cx('header-icon')} icon={faRightToBracket}/>
                </Link>
            </div>
            <div className={cx('image-container')}>
                <Image className={cx('background')} src={images.signin}/>
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
                            <input className={cx('input-bar')} type="text" name="username" required/>
                        </div>
                        <div className={cx('input-field')}>
                            <p className={cx('input-label')}>Password</p>
                            <input className={cx('input-bar')} type="password" name="password" required/>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('remember-password')}>
                                <input className={cx('remember-check')} type="checkbox"/>
                                <span className={cx('info-text')}>Remember me</span>
                            </div>
                            <span className={cx('info-text')}>Forgot password?</span>
                        </div>
                        <Button className={cx('submit-btn')}>Sign In</Button>
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('footer-container')}>
                            <Link to={config.routes.signup} className={cx('signup-text')}>
                                Don't have an account? Sign Up now
                            </Link>
                            <div className={cx('gg-signup')}>
                                <Image className={cx('gg-logo')} src={images.google_logo}/>
                                <span className={cx('signup-text')}>Sign Up with Google</span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignIn;