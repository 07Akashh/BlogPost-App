import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectInput from '../shared/SelectInput';
import useRegisterForm from '../hooks/useRegisterForm';
import useRegister from '../hooks/useRegister';

const Register = () => {
    const initialFormState = {
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '+91',
        gender: ''
    };
    
    const { formData,handleChange } = useRegisterForm(initialFormState);
    const { isSubmitting, errors, handleSubmit } = useRegister(formData);
    return (
        <>
            <ToastContainer />
            <div className='mx-auto flex flex-col min-h-screen items-center justify-center'>
                <div className='w-[300px] sm:w-[350px] lg:w-[370px] bg-white shadow-2xl'>
                    <div className="mt-10">
                        <form onSubmit={handleSubmit} className='flex flex-col px-[40px]'>
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
                            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                            <input
                                className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent'
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                            {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
                            <input
                                className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent'
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                            <input
                                className='bg-slate-100 border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent'
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}

                            <PhoneInput
                                country={"in"}
                                onChange={handleChange}
                                placeholder='Phone'
                                specialLabel=''
                            />
                            {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}

                            <SelectInput
                                name="gender"
                                placeholder="Gender"
                                handleChange={handleChange}
                                options={['Male', 'Female', 'Custom']}
                            />
                            {errors.gender && <span className="text-red-500 text-xs">{errors.gender}</span>}

                            <button
                                className='bg-blue-500 text-white rounded-xl hover:bg-blue-600 w-full py-4 mt-2 font-bold uppercase'
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>

                            <p className='mt-5 text-center'>Already have an account? <a href="/login" className='underline text-blue-500'>Login</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Register;
