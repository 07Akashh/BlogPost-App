import React from 'react';

const SelectInput = ({ name, value, handleChange, options }) => (
    <select
        name={name}
        value={value}
        onChange={handleChange}
        required
        className=' bg-white border-none my-[8px] mx-auto py-[10px] px-[15px] rounded-md text-[13px] w-[220px] sm:w-[100%] outline-transparent mb-5'
    >
        <option value="" disabled selected={true} >Select Gender</option>
        {options.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
    </select>
);

export default SelectInput;
