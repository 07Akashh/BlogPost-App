import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Header = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useSelector((state) => state.auth);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const isLoggedIn = user;

    return (
        <header className="bg-white text-black border-b-2 fixed top-0 left-0 w-full z-50">
            <nav className="container mx-auto p-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    The Blog
                </Link>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/user" className="hover:underline">User</Link>
                    </div>
                    {!isLoggedIn ? (
                        <Link to="/login" className="bg-white text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-100">
                            Login
                        </Link>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-1 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none"
                                aria-expanded={isOpen}
                            >
                                <img
                                    src={user.profile_image}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                                {isOpen ? (
                                    <IoIosArrowUp className="transition-transform duration-300" />
                                ) : (
                                    <IoIosArrowDown className="transition-transform duration-300" />
                                )}
                            </button>
                            {isOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg"
                                    role="menu"
                                    onClick={() => setIsOpen(false)} // Close dropdown on click
                                >
                                    <div>
                                        <Link
                                            to="/"
                                            className="block sm:hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            to="/user"
                                            className="block sm:hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            User
                                        </Link>
                                    </div>
                                    <Link
                                        to={`/user/${user._id}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            dispatch(logout());
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
