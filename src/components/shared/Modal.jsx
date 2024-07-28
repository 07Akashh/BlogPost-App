import React, { useState } from 'react';

const Modal = ({ children, triggerButtonLabel = 'Open Modal', onClose }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        if (onClose) onClose();
    };

    return (
        <div className=''>
            <button onClick={handleOpen} className="bg-gray-300 p-1 px-2 rounded-md text-md font-semibold text-gray-800">
                {triggerButtonLabel}
            </button>
            {open && (
                <div className="flex justify-center items-center fixed z-1000 left-0 top-0 h-full w-full overflow-auto bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white m-auto p-5 border border-gray-300 sm:w-2/5 w-5/6 rounded-lg">
                        {React.cloneElement(children, { handleClose })}
                        <span
                            className="absolute top-2.5 right-2.5 text-2xl cursor-pointer text-gray-800 hover:text-black focus:text-black" 
                            onClick={handleClose}
                        >
                            &times;
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
