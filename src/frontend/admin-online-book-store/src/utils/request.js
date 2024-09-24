import axios from 'axios';

const request = axios.create({
    baseURL: 'https://online-book-store-web.onrender.com/',
    headers: {
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
});

export default request;
