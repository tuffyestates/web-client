import apiClient from './apiClient';

export function registerUser(userData) {
    return apiClient.post('/user', userData);
}