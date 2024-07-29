import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';

const PostMenu = ({ onEditClick, onDeleteClick }) => (
    <Menu as="div" className="relative inline-block text-left z-30">
        <Menu.Button className="inline-flex justify-center w-full rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${active ? 'bg-gray-100' : ''
                                    } group flex items-center w-full px-2 py-2 text-sm text-gray-900`}
                                onClick={onEditClick}
                            >
                                Edit
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${active ? 'bg-gray-100' : ''
                                    } group flex items-center w-full px-2 py-2 text-sm text-gray-900`}
                                onClick={onDeleteClick}
                            >
                                Delete
                            </button>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Transition>
    </Menu>
);

export default PostMenu;
