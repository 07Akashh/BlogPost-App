import React from 'react';
import { FaHome, FaUser, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ activeSection, setActiveSection, onAddPost }) => {
    const sections = [
        { name: 'home', icon: <FaHome /> },
        { name: 'users', icon: <FaUsers /> },
        { name: 'profile', icon: <FaUser /> },
        { name: 'logout', icon: <FaSignOutAlt /> }
    ];

    return (
        <>
            <div className="p-4 md:w-60 lg:w-72 h-screen bg-fixed bg-gray-200 sticky shadow-lg border hidden md:block z-50">
                <h2 className="text-xl font-bold mb-4 ">User BlogSpot</h2>
                <ul>
                    {sections.map((section) => (
                        <li
                            key={section.name}
                            className={`mb-2 p-2 cursor-pointer rounded-lg shadow-md ${activeSection === section.name ? 'bg-gray-100' : 'bg-white'}`}
                            onClick={() => setActiveSection(section.name)}
                        >
                            <div className='flex gap-2 '>

                            <span className=" sm:hidden">{section.icon}</span>
                            {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="fixed bottom-0 border-t w-full bg-gray-100 p-2 shadow-lg border md:hidden flex justify-around z-50 ">
                {sections.map((section) => (
                    <div
                        key={section.name}
                        className={`p-2 cursor-pointer text-2xl ${activeSection === section.name ? 'text-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveSection(section.name)}
                    >
                        {section.icon}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Sidebar;
