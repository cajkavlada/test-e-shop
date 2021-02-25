import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://test-e-shop-default-rtdb.firebaseio.com/'
});

export default instance;
