import axios from 'axios'

// import the API URL from the .env file
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Tell axios to add the access token to the Authorization header on every request
axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`;
    return config;
});

// If the response is 401, remove the access token from local storage and redirect to the login page or throw an error
axiosClient.interceptors.response.use(response => {

    return response;
}, error => {
    const { response } = error;
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = '/login';
    }

    throw error;
})

export default axiosClient;