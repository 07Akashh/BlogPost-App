import { useState } from 'react';

const useLoginForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return { formData, errors, setErrors, handleChange };
};

export default useLoginForm;
