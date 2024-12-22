import React from 'react';

const Textarea = ({ name, value, handleChange }) => (
    <textarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder="Bio"
        rows="4"
        required
        className='bg-white border-none my-[8px] mx-auto py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent'
    />
);

export default Textarea;
