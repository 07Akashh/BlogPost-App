import React from 'react';

const Input = ({ input, name, value, handleChange, placeholder }) => (
    <input
        type={input}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className='bg-slate-100 border-none my-[8px] mx-auto py-[10px] px-[15px] flex justify-center rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent'
    />
);

export default Input;
