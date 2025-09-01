import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api';

const REQUEST_TIMEOUT = 10000; // 10 seconds

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`, // Get token from localStorage if available
    },
});

// Response interceptor for handling errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('API Error:', error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('API Error: No response received', error.request);
            return Promise.reject({ message: 'No response from server' });
        } else {
            // Something happened in setting up the request
            console.error('API Error:', error.message);
            return Promise.reject({ message: error.message });
        }
    }
);


export default apiClient;