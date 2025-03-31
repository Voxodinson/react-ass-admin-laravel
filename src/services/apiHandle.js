import axios from 'axios';
import { Message } from '../context/AlertProvider';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to retrieve the token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper function to handle errors in API requests
const handleError = (error) => {
    if (error.response) {
        // API responded with an error
        Message(error.response.data?.message || 'API Error', 'error');
    } else if (error.request) {
        // No response from server
        Message('No response from server. Check network connection.', 'error');
    } else {
        // Other errors (e.g., request setup)
        Message(error.message, 'error');
    }
};

// Function to handle the common API call structure (GET, POST, PUT, DELETE)
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
