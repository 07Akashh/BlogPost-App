import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/AuthService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login(formData);
            toast.success('Login successful! Redirecting...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            toast.error(`Login failed: ${error.response?.data?.message || 'An error occurred'}`);
            console.error(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='mx-auto align-middle items-center justify-center flex flex-col min-h-screen'>
                <div className='w-[300px] sm:w-[350px] lg:w-[370px] relative max-w-[100%] sm:min-h-[480px] min-h-[380px] bg-white shadow-2xl overflow-hidden'>
                    <div className="sm:mt-20 mt-10 h-[100%]">
                        <form onSubmit={handleSubmit} className='flex-col flex align-middle h-[100%] px-[40px] content-center'>
                            <h1 className='w-[200px] text-center text-lg font-semibold self-center'>Login Account</h1>
                            <span className='text-center w-[300px] mb-4 self-center'>or use your email for registration</span>
                            <input className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent' type="text" name="username" placeholder="Email or Username" onChange={handleChange} required />
                            <input className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent' type="password" name="password" placeholder="Password" onChange={handleChange} required />
                            <button className='sm:self-center bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-[12px] w-[220px]  py-4 px-10 font-bold uppercase cursor-pointer mt-5' type="submit">Login</button>
                            <p className='sm:mt-20 mt-5 w-[100%] text-center'>Don't have an account? <a href="/register" className='underline hover:text-blue-800 text-blue-500'>Register</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
