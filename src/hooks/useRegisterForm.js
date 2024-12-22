import { useState } from 'react';

const useRegisterForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        if (e && e.target) {
            const { name, value, files } = e.target;
            setFormData((prevState) => ({
                ...prevState,
                [name]: name === 'phone' ? e : (files ? (files.length > 0 ? files[0] : prevState[name]) : value)
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                phone: e
            }));
        }
    };

    return { formData, handleChange };
};

export default useRegisterForm;
