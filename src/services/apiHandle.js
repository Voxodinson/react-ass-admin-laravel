import axios from 'axios';
import { 
    Message 
} from '../context/AlertProvider';

const BASE_URL = process.env.BASE_URL;   

const apiHandle = {
    get: async (endpoint) => {
        try {
            const response = await axios.get(`${BASE_URL}/${endpoint}`);
            if(!response){
                Message(response.message, 'success')
            }
            return response.data;
        } 
        catch (error) 
        {
            Message('Error fetching data:', 'error');
            throw error;
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
            if(!response){
                Message(response.message, 'success')
            }
            return response.data;
        } 
        catch (error) 
        {
            Message('Error create data:', 'error');
            throw error;
        }
    },

    put: async (endpoint, data) => {
        try {
            const response = await axios.put(`${BASE_URL}/${endpoint}`, data);
            if(!response){
                Message(response.message, 'success')
            }
            return response.data;
        } 
        catch (error) 
        {
            Message('Error create data:', 'error');
            throw error;
        }
    },

    delete: async (endpoint) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${endpoint}`);
            if(!response){
                Message(response.message, 'success')
            }
            return response.data;
        } 
        catch (error) 
        {
            Message('Error create data:', 'error');
            throw error;
        }
    },
};

export default apiHandle;
