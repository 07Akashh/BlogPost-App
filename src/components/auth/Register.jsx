import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectInput from '../shared/SelectInput';
import useRegisterForm from '../../hooks/useRegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { parseErrorArray } from '../../utils/utils';
import { register } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useSelector((state) => state.auth);
    const [formErrors, setFormErrors] = useState({});
    const initialFormState = {
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '+91',
        gender: ''
    };

    const { formData, handleChange } = useRegisterForm(initialFormState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(register(formData));
            toast.success('Login successful! Redirecting...');
            setTimeout(() => navigate('/', { state: { key: Date.now() } }), 1000);
            window.location.reload();
        } catch (error) {
            toast.error(`Login failed: ${error.response?.data?.message || 'An error occurred'}`);
        }
    };

    useEffect(() => {
        if (error && Array.isArray(error)) {
            const parsedErrors = parseErrorArray(error);
            setFormErrors(parsedErrors);
        }
    }, [error]);

    return (
        <>
            <ToastContainer />
            <div className='mx-auto flex flex-col min-h-screen items-center justify-center'>
                <div className='w-[300px] sm:w-[350px] lg:w-[370px] bg-white shadow-2xl'>
                    <div className="mt-10">
                        <form onSubmit={handleSubmit} className='flex mb-5 flex-col px-[40px]'>
                            <h1 className='text-lg font-semibold text-center'>Create Account</h1>
                            <span className='text-center mb-4'>or use your email for registration</span>

                            <input
                                className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent'
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                                required
                            />
                            {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>}
                            <input
                                className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent'
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                            {formErrors.username && <span className="text-red-500 text-xs">{formErrors.username}</span>}
                            <input
                                className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent'
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />
                            {formErrors.email && <span className="text-red-500 text-xs">{formErrors.email}</span>}
                            <input
                                className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent'
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            {formErrors.password && <span className="text-red-500 text-xs">{formErrors.password[0]}</span>}

                            <PhoneInput
                                country={"in"}
                                onChange={handleChange}
                                placeholder='Phone'
                                specialLabel=''
                            />
                            {formErrors.phone && <span className="text-red-500 text-xs">{formErrors.phone}</span>}

                            <SelectInput
                                name="gender"
                                placeholder="Gender"
                                handleChange={handleChange}
                                options={['Male', 'Female', 'Custom']}
                            />
                            {formErrors.gender && <span className="text-red-500 text-xs">{formErrors.gender}</span>}

                            <button
                                className='bg-black text-white rounded-xl hover:bg-black/80 w-full py-4 mt-2 font-bold uppercase'
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Registering...' : 'Register'}
                            </button>

                            <p className='mt-5 text-center'>Already have an account? <a href="/login" className='hover:underline text-black'>Login</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Register;
