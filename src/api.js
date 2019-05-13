import axios from 'axios';

const client = axios.create({
    baseURL: process.env.API_PATH
});
client.defaults.withCredentials = true;

export default client;
