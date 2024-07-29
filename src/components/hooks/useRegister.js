import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../../services/AuthService';

const useRegister = (formData) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await AuthService.register(formData);
            toast.success('Registration successful! Redirecting to Home Page');
            setTimeout(() => navigate('/', { state: { key: Date.now() } }), 2000);
        } catch (error) {
            toast.error(`Registration failed: ${error.response?.data?.message || 'An error occurred'}`);
            console.error("Error:", error);
            setErrors(error.response?.data?.errors.reduce((acc, err) => {
                acc[err.path] = err.msg;
                return acc;
            }, {}));
        } finally {
            setIsSubmitting(false);
        }
    };

    return { isSubmitting, errors, handleSubmit };
};

export default useRegister;
