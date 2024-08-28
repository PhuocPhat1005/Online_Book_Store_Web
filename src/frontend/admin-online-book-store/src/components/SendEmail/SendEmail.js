import classNames from "classnames/bind";
import { useState } from "react";
import React from 'react';

import styles from './SendEmail.module.scss'
import Button from "../../components/Button";
import config from "../../config";
import request from "../../utils/request";
import IncorrectBox from "../../components/IncorrectBox";
import Loading from "./Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)

function SendEmail(props) {

    const navigate = useNavigate();
    const [inCorrectMess, setIncorrectMess] = useState('');
    const [toggleToast, setToggleToast] = useState(true);
    const [issuccessfull, setIsSuccessfull] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const forgotpassword_data = {
            email: formData.get('email'),
        };
        
        try {
            setIsLoading(true);
            const response = await request.post('auth/forgot_password', forgotpassword_data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                // Handle successful form submission
                console.log('Form submitted successfully');
                setIsSuccessfull(true);
                setToggleToast(true);
                setIsLoading(false);
            } else {
                // Handle errors
                setIsSuccessfull(false);
                setIsLoading(false);
                setToggleToast(false);
                console.error('Form submission failed', response.data);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setIsSuccessfull(false);
                setIsLoading(false);
                setToggleToast(false);
                setIncorrectMess('Didn\'t find valid Email');
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

    const handleToast = () => {
        if (inCorrectMess === '') return;
        setToggleToast(true);
    }

    const closeIncorrectBox = () => {
        setToggleToast(true);
        setIncorrectMess('');
    }

    return (
        <div className={cx('fp-overlay')}>
            <form className={cx('forgot-password-form')} onSubmit={handleSubmit}>
                {!isLoading && 
                <div className={cx('fp-container')}>
                    <div className={cx('fp-header')}>
                        <p className={cx('fp-header-label')}>Reset your password?</p>
                        <FontAwesomeIcon className={cx('fp-close')} icon={faXmark} onClick={props.handleResetPassword}/>
                    </div>
                    <div className={cx('fp-body')}>
                        <label className={cx('fp-body-label')}>Email</label>
                        <input className={cx('fp-body-input')} name="email" type="email" placeholder="e.g, email_name@gmail.com" required/>
                        <p className={cx('fp-paragraph')}>We will send a notification to your email address, please check your email after few seconds.</p>
                        <Button className={cx('fb-body-btn')} onClick={handleToast}>Send</Button>
                    </div>
                </div>}
            </form>
            {isLoading && <Loading className={cx('loading')}/>}
            {!toggleToast && <IncorrectBox mess={inCorrectMess} onClose={closeIncorrectBox}/>}
        </div>
    )
}

export default SendEmail;
