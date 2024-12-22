import React from 'react';
import ReactMarkdown from 'react-markdown'

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
};

const getRandomChip = () => {
    const chipTags = ['New', 'Trending', 'Hot', 'Popular', 'Featured', 'Exclusive'];
    const randomIndex = Math.floor(Math.random() * chipTags.length);
    return chipTags[randomIndex];
};

const getRandomColor = () => {
    const colors = ['red', 'gray', 'green', 'yellow', 'purple', 'pink'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex];
    return {
        bgColor: `${color}-200`,
        textColor: `${color}-600`,
    };
};

const PostContent = ({ title, content, date }) => (
    <div className="my-2 space-y-2">
        <div className="text-sm font-semibold text-[#6941C6]">{formatDate(date)}</div>
        <div className="text-xl line-clamp-1 font-bold">{title}</div>
        <div className="text-sm line-clamp-3 sm:line-clamp-2 text-[#667085]">{content}</div>
        <div className="flex gap-2 mt-2">
            {[...Array(3)].map((_, index) => {
                const { bgColor, textColor } = getRandomColor();
                return (
                    <div
                        key={index}
                        className={`inline-flex text-${textColor} items-center px-2 py-1 text-sm font-medium bg-${bgColor} rounded-full`}
                    >
                        <span>{getRandomChip()}</span>
                    </div>
                );
            })}
        </div>
    </div>
);

const PostDetailContent = ({ title, content, date, summary }) => (
    <div className="my-2 space-y-2">
                <div className="flex gap-2 my-2">
            {[...Array(3)].map((_, index) => {
                const { bgColor, textColor } = getRandomColor();
                return (
                    <div
                        key={index}
                        className={`inline-flex text-${textColor} items-center px-2 py-1 text-sm font-medium bg-${bgColor} rounded-full`}
                    >
                        <span>{getRandomChip()}</span>
                    </div>
                );
            })}
        </div>
        <div className="text-sm font-semibold text-[#6941C6]">{formatDate(date)}</div>
        <div className="text-xl font-bold">{title}</div>
        <div className="text-md text-[#667085]">{content}</div>
        {summary && (
            <>
                <h3 className='font-semibold text-xl'>Summary</h3>
                <div className="summary-container text-md text-[#667085] bg-[#f9fafb] p-4 rounded-md shadow-sm">
                    <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
            </>
        )}
    </div>
);

export { PostContent, PostDetailContent };
