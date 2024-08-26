import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './GoogleRegister.module.scss';
import request from '../../utils/request';
import Image from '../../components/Image';
import assets from '../../assets';
import { useEffect } from 'react';

import axios from 'axios';

const cx = classNames.bind(styles);

function GoogleRegister() {
    // const handleRegister = async () => {
    //     try {
    //         const response = await request.get('auth/login/google', { withCredentials: true });

    //         if (response.status === 200) {
    //             console.log('Register successfully');

    //             const googleAuthUrl = response.data.google_auth_url._headers.location;
    //             console.log(googleAuthUrl);
    //         } else {
    //             console.error('Register failed');
    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             console.error('Register failed with,', error.response.data);
    //         } else if (error.request) {
    //             console.error('No response received', error.request);
    //         } else {
    //             console.error('Error', error.message);
    //         }
    //     }
    // };

    const handleRegister = async () => {
        try {
            const response = await request.get('auth/a', { withCredentials: true });

            if (response.status === 200) {
                console.log('Register successfully');
                console.log(response.data);

                const res = await request.get('auth/b', {
                    params: {
                        state: response.data.state,
                    },
                    withCredentials: true,
                });
                if (res.status === 200) {
                    console.log(res.data);
                }
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

// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import request from '../../utils/request';

// function GoogleRegister() {
//     const location = useLocation();
//     const [registerState, setRegisterState] = useState('');

//     const handleRegister = async () => {
//         try {
//             const response = await request.get('auth/login/google');
//             if (response.status === 200) {
//                 const googleAuthUrl = response.data.google_auth_url._headers.location;
//                 setRegisterState(response.data.state);

//                 // Chuyển hướng người dùng đến URL xác thực của Google
//                 window.location.href = googleAuthUrl;

//                 const session = await request.get('auth/check_session');
//                 if (session.status === 200) {
//                     console.log('Session 1: ', session.data.session);
//                 }
//             } else {
//                 console.error('Register failed');
//             }
//         } catch (error) {
//             console.error('Error', error.message);
//         }
//     };

//     useEffect(() => console.log('STATE: ', registerState), [registerState]);

//     // useEffect(() => {
//     //     const urlParams = new URLSearchParams(location.search);
//     //     const state = urlParams.get('state');
//     //     console.log(urlParams);
//     //     console.log('STATE: ', state);

//     //     if (state) {
//     //         const handleRegisterCallback = async () => {
//     //             try {
//     //                 const response = await request.get('auth/google-callback', {
//     //                     params: { state },
//     //                 });

//     //                 if (response.status === 200) {
//     //                     console.log('Callback successful');
//     //                     console.log(response.data);

//     //                     const session = await request.get('auth/check_session');
//     //                     if (session.status === 200) {
//     //                         console.log('Session 2: ', session.data.session);
//     //                     }
//     //                 } else {
//     //                     console.error('Callback failed');
//     //                 }
//     //             } catch (error) {
//     //                 console.error('Callback error', error.message);
//     //             }
//     //         };
//     //         handleRegisterCallback();
//     //     }
//     // }, [location.search]);

//     return (
//         <div>
//             <button onClick={handleRegister}>Sign Up with Google</button>
//         </div>
//     );
// }

// export default GoogleRegister;
