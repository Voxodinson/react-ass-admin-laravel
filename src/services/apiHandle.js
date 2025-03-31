import axios from 'axios';
import { Message } from '../context/AlertProvider';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem("token");

const handleError = (error) => {
    if (error.response) {
        Message(error.response.data?.message || 'API Error', 'error');
    } else if (error.request) {
        Message('No response from server. Check network connection.', 'error');
    } else {
        Message(error.message, 'error');
    }
};

const apiRequest = async (method, endpoint, data = null) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        };

        let response;
        switch (method) {
            case 'get':
                response = await axios.get(`${BASE_URL}/${endpoint}`, config);
                break;
            case 'post':
                response = await axios.post(`${BASE_URL}/${endpoint}`, data, config);
                break;
            case 'put':
                response = await axios.put(`${BASE_URL}/${endpoint}`, data, config);
                break;
            case 'delete':
                response = await axios.delete(`${BASE_URL}/${endpoint}`, config);
                break;
            default:
                throw new Error('Invalid HTTP method');
        }

        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

const apiHandle = {
    get: async (endpoint) => apiRequest('get', endpoint),
    post: async (endpoint, data) => apiRequest('post', endpoint, data),
    put: async (endpoint, data) => apiRequest('put', endpoint, data),
    delete: async (endpoint) => apiRequest('delete', endpoint),
};

export default apiHandle;
