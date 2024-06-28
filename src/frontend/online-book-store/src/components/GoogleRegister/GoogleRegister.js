import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import request from '~/utils/request';

function GoogleRegister() {
    const location = useLocation();

    const handleRegister = async () => {
        try {
            const response = await request.get('/auth/login/google');
            if (response.status === 200) {
                const googleAuthUrl = response.data.google_auth_url;
                window.location.href = googleAuthUrl;
            } else {
                console.error('Register failed');
            }
        } catch (error) {
            console.error('Error', error.message);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const state = urlParams.get('state');
        const code = urlParams.get('code'); // Assuming the callback URL has a code parameter

        if (state && code) {
            const handleRegisterCallback = async () => {
                try {
                    const response = await request.get('/auth/google-callback', {
                        params: { state, code },
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
