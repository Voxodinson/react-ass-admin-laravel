import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};
