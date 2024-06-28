// import classNames from 'classnames/bind';
// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// import styles from './GoogleRegister.module.scss';
// import request from '~/utils/request';
// import Image from '~/components/Image';
// import assets from '~/assets';
// import { useEffect } from 'react';

// const cx = classNames.bind(styles);

// function GoogleRegister() {
//     const [registerState, setRegisterState] = useState('');

//     const handleRegister = async () => {
//         try {
//             const response = await request.get('auth/login/google');

//             if (response.status === 200) {
//                 console.log('Register successfully');

//                 const googleAuthUrl = response.data.google_auth_url._headers.location;

//                 googleAuthUrl
//                     ? window.open(googleAuthUrl, '_blank')
//                     : console.error('No URL received for Google login');

//                 setRegisterState(response.data.state);
//             } else {
//                 console.error('Register failed');
//             }
//         } catch (error) {
//             if (error.response) {
//                 console.error('Register failed with,', error.response.data);
//             } else if (error.request) {
//                 console.error('No response received', error.request);
//             } else {
//                 console.error('Error', error.message);
//             }
//         }
//     };

//     useEffect(() => {
//         console.log(registerState);
//         const handleRegisterCallback = async () => {
//             try {
//                 const response = await request.get('auth/google-callback', {
//                     params: { state: registerState },
//                 });

//                 if (response.status === 200) {
//                     console.log('(callback) Register successfully');
//                     console.log(response.data);
//                 } else {
//                     console.error('(callback) Register failed');
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     console.error('(callback) Register failed with,', error.response.data);
//                 } else if (error.request) {
//                     console.error('(callback) No response received', error.request);
//                 } else {
//                     console.error('(callback) Error', error.message);
//                 }
//             }
//         };
//         handleRegisterCallback();
//     }, [registerState]);

//     return (
//         <div className={cx('gg-signup')}>
//             <Image className={cx('gg-logo')} src={assets.google_logo} />
//             <p className={cx('signup-text')} onClick={handleRegister}>
//                 Sign Up with Google
//             </p>
//         </div>
//     );
// }

// export default GoogleRegister;import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import request from '~/utils/request';
import { useEffect } from 'react';

function GoogleRegister() {
    const location = useLocation();

    const handleRegister = async () => {
        try {
            const response = await request.get('auth/login/google');
            if (response.status === 200) {
                const googleAuthUrl = response.data.google_auth_url_headers.location;

                // Chuyển hướng người dùng đến URL xác thực của Google
                window.location.href = googleAuthUrl;
            } else {
                console.error('Register failed');
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

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const state = urlParams.get('state');

        if (state) {
            const handleRegisterCallback = async () => {
                try {
                    const response = await request.get('auth/google-callback', {
                        params: { state },
                    });

                    if (response.status === 200) {
                        console.log('Callback successful');
                        console.log(response.data);
                    } else {
                        console.error('Callback failed');
                    }
                } catch (error) {
                    console.error('Callback error', error.message);
                }
            };
            handleRegisterCallback();
        }
    }, [location.search]);

    return (
        <div>
            <button onClick={handleRegister}>Sign Up with Google</button>
        </div>
    );
}

export default GoogleRegister;
