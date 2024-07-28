import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import PhoneInput from 'react-phone-input-2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectInput from '../shared/SelectInput';

const Register = () => {
    const [phone, ] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '+91' + phone,
        gender: ''
    });

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(formData);
            toast.success('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            toast.error(`Registration failed: ${error.response?.data?.message || 'An error occurred'}`);
            console.error(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='mx-auto align-middle items-center justify-center flex flex-col min-h-screen'>
                <div className='w-[300px] sm:w-[350px] lg:w-[370px] relative max-w-[100%] sm:min-h-[480px] min-h-[380px] bg-white shadow-2xl overflow-hidden'>
                    <div className="mt-10 h-[100%]">
                        <form onSubmit={handleSubmit} className='flex-col flex align-middle h-[100%] px-[40px] content-center'>
                            <h1 className='w-[200px] text-center text-lg font-semibold self-center'>Create Account</h1>
                            <span className='text-center w-[300px] self-center'>or use your email for registration</span>
                            <input className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent' type="text" name="name" placeholder="Name" onChange={handleChange} required />
                            <input className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent' type="text" name="username" placeholder="Username" onChange={handleChange} required />
                            <input className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent' type="email" name="email" placeholder="Email" onChange={handleChange} required />
                            <input className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent' type="password" name="password" placeholder="Password" onChange={handleChange} required />
                            <PhoneInput country={"in"} value={phone} onChange={handleChange} placeholder='Phone' specialLabel='' />
                            <SelectInput name="gender" placeholder="Gender" handleChange={handleChange} options={['Male', 'Female', 'Custom']} />
                            <button className='sm:self-center bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-[12px] w-[220px]  py-4 px-10 font-bold uppercase cursor-pointer mt-5' type="submit">Register</button>
                            <p className='sm:mt-20 my-5 w-[100%] text-center'>Already have an account? <a href="/login" className='underline hover:text-blue-800 text-blue-500'>Login</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;

