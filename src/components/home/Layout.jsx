import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow mt-12 pt-10 container mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
