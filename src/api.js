import axios from 'axios';

const client = axios.create({
    baseURL: process.env.API_PATH
});

export default client;
