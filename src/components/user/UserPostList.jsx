import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import EditPost from '../post/EditPost';
import { isImage, isVideo } from '../shared/CheckPost';

const UserPostList = ({ posts = [], onDelete, currentUserId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editPostId, setEditPostId] = useState(null);
    const [editFormData, setEditFormData] = useState({ title: '', content: '', post_url: '' });
    const [updatedPosts, setUpdatedPosts] = useState(posts);

    useEffect(() => {
        setUpdatedPosts(posts);
    }, [posts]);

    const handleEditClick = (post) => {
        setIsEditing(true);
        setEditPostId(post._id);
        setEditFormData({ title: post.title, content: post.content, post_url: post.post_url });
    };

    const handleEditComplete = (updatedData) => {
        if (updatedData) {
            const newPosts = updatedPosts.map((post) =>
                post._id === updatedData._id ? updatedData : post
            );
            setUpdatedPosts(newPosts);
        }
        setIsEditing(false);
        setEditPostId(null);
    };

    const handleDeleteClick = (postId) => {
        const newPosts = updatedPosts.filter(post => post._id !== postId);
        setUpdatedPosts(newPosts);
        if (onDelete) {
            onDelete(postId);
        }
    };


    return (
        <div className="post-list -z-0">
            {updatedPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 z-0">
                    {updatedPosts.map((post) => (
                        <div key={post._id} className="post-item border rounded-lg p-2 relative">
                            {post.post_url && isImage(post.post_url) && <img src={post.post_url} alt="Post" className='w-full h-44 object-cover' />}
                            {post.post_url && isVideo(post.post_url) && <video src={post.post_url} controls className='w-full h-44 border object-cover' />}
                            <div className="flex justify-between items-center mt-2">
                                <h3 className="font-semibold">{post.title}</h3>
                                <Menu as="div" className="relative inline-block text-left z-30">
                                    <Menu.Button className="inline-flex justify-center w-full rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition
                                        as={React.Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {post.author._id === currentUserId && (
                                                    <>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${active ? 'bg-gray-100' : ''
                                                                        } group flex items-center w-full px-2 py-2 text-sm text-gray-900`}
                                                                    onClick={() => handleEditClick(post)}
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
                                                                    onClick={() => handleDeleteClick(post._id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </>
                                                )}

                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            {isEditing && editPostId === post._id ? (
                                <EditPost
                                    postId={post._id}
                                    initialData={editFormData}
                                    onEditComplete={handleEditComplete}
                                />
                            ) : (
                                <>
                                    <p>{post.content}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default UserPostList;
