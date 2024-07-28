import React from 'react';

const Input = ({ input, name, value, handleChange, placeholder }) => (
    <input
        type={input}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className='bg-white border-none my-[8px] mx-0 py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent'
    />
);

export default Input;
