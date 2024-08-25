    import classNames from 'classnames/bind';
    import { useEffect } from 'react';
    import { useNavigate, useLocation } from 'react-router-dom';
    import styles from './GoogleRegister.module.scss';
    import request from '~/utils/request';
    import Image from '~/components/Image';
    import assets from '~/assets';

    const cx = classNames.bind(styles);

    function GoogleRegister() {
        const location = useLocation();
        const navigate = useNavigate();

        const handleRegister = async () => {
            try {
                const response = await request.get('/auth/login/google', { withCredentials: true });
                if (response.status === 200) {
                    const googleAuthUrl = response.data.google_auth_url._headers.location;
                    const state = response.data.state;
                    console.log("State: ", state)
                    localStorage.setItem('oauth_state', state); // Store state in localStorage
                    window.location.href = googleAuthUrl;
                } else {
                    console.error('Register failed');
                }
            } catch (error) {
                if (error.response) {
                    console.error('Register failed with', error.response.data);
                } else if (error.request) {
                    console.error('No response received', error.request);
                } else {
                    console.error('Error', error.message);
                }
            }
        };

        useEffect(() => {
            const urlParams = new URLSearchParams(location.search);
            const stateFromUrl = urlParams.get('state');
            const code = urlParams.get('code');

            const storedState = localStorage.getItem('oauth_state');

            console.log("urlParams: ", urlParams)
            console.log("stateFromUrl: ", stateFromUrl)
            console.log("code: ", code)
            console.log("storedState: ", storedState)

            if (stateFromUrl && code && storedState) {
                const handleRegisterCallback = async () => {
                    try {
                        if (stateFromUrl !== storedState) {
                            console.error('State does not match');
                            return;
                        }

                        const response = await request.get('/auth/google-callback', {
                            params: { state: stateFromUrl, code },
                            withCredentials: true,
                        });
 
                        console.log("Response: ", response)

                        if (response.status === 200) {
                            console.log('Callback successful');
                            navigate('/home'); // Navigate to dashboard after successful login
                        } else {
                            console.error('Callback failed');
                        }

                        localStorage.removeItem('oauth_state'); // Remove state from localStorage after use
                        console.log('OAuth state removed from localStorage');
                    } catch (error) {
                        console.error('Callback error', error.message);
                    }
                };
                handleRegisterCallback();
            }
        }, [location.search, navigate]);

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
