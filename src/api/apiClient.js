import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.API_PATH
});

export default apiClient;