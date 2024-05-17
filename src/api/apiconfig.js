import axios from 'axios';

// Create a new Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}api/v1/`, // Set your base URL here
    headers: {
        'Content-Type': 'application/json' // Set the default content type here
    }

});

const axiosAuthorized = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}api/v1/`, // Set your base URL here
});

axiosAuthorized.interceptors.request.use(
    config => {
        // Get the token from your storage (e.g., localStorage, sessionStorage)
        const token = localStorage.getItem('token');
console.log(token)
        // Add the token to the request headers if it exists
        if (token) {
            config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
            config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;

        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle response data before resolving
axiosInstance.interceptors.response.use(
    response => {
        // You can modify response data, handle errors, etc. here
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export  {axiosInstance,axiosAuthorized};
