import React from 'react';
import { Link } from 'react-router-dom';

const UserInfo = ({ author, createdAt, getTimeSinceCreation, getInitials }) => (
    <div className="flex w-full items-center justify-between border-b pb-3">
        <Link to={`/user/${author._id}`}>
            <div className="flex items-center space-x-3">
                {author.profile_image ? (
                    <img src={author.profile_image} alt="profile_image" className="h-8 w-8 rounded-full bg-slate-400" />
                ) : (
                    <div className="h-8 w-8 rounded-full bg-slate-400 m-auto flex items-center justify-center text-white font-bold">
                        {getInitials(author.name)}
                    </div>
                )}
                <div className="text-lg font-bold text-slate-700">{author.name}</div>
            </div>
        </Link>
        <div className="flex items-center space-x-8">
            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold hidden lg:block">Category</button>
            <div className="text-xs text-neutral-500">{getTimeSinceCreation(createdAt)}</div>
        </div>
    </div>
);

export default UserInfo;
