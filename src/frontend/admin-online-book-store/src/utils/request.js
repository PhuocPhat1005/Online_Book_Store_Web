import axios from 'axios';

const request = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
});

export default request;
