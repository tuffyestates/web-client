import axios from 'axios'

export const dataClient = axios.create({
    baseURL: process.env.API_PATH
})