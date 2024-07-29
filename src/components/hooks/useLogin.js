import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../../services/AuthService';

const useLogin = (formData, setErrors) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(formData);
            toast.success('Login successful! Redirecting...');
            setTimeout(() => navigate('/', { state: { key: Date.now() } }), 2000);
        } catch (error) {
            toast.error(`Login failed: ${error.response?.data?.message || 'An error occurred'}`);
            setErrors(error.response?.data?.message);
            console.error(error);
        }
    };

    return { handleSubmit };
};

export default useLogin;
