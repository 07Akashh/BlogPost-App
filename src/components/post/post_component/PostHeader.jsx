import { Link } from "react-router-dom";
import { getTimeSinceCreation } from "../../utils/utils";

const PostHeader = ({ author, createdAt }) => (
    <div className="flex w-full items-center justify-between border-b pb-3">
        <Link to={`/user/${author?._id}`} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center space-x-3">
                <img src={author?.profile_image} alt="profile_image" className="h-8 w-8 rounded-full bg-slate-400" />
                <div className="sm:text-lg text-sm font-bold text-slate-700">{author?.name}</div>
            </div>
            <div className="flex items-center space-x-8">
                <div className="text-xs hidden sm:block text-neutral-500">
                    {getTimeSinceCreation(createdAt)}
                </div>
            </div>
        </Link>

    </div>
);

export default PostHeader;