import React from 'react';

const Footer = () => {
    return (
        <footer className="text-black py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-lg font-semibold">The Blog</p>
            
                <p className="mt-4 md:mt-0">&copy; {new Date().getFullYear()} The Blog. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
