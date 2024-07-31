import axios from 'axios';

const API_URL = 'https://blogpost-api.run.place/api/users';

const register = async (userData) => {
    console.log(userData)
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response.data.errors);
        throw error.response.data.errors;
    }
};

const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

const logout = () => {
    localStorage.clear();
};

const getCurrentUser = () => {
    return localStorage.getItem('token');
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService;
