import { dataClient } from 'dataClient';

export function registerUser(userData) {
    return dataClient.post('/user', userData);
}