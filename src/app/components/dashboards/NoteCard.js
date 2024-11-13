import React from 'react';

const NoteCard = ({ title, category, time, date, content }) => {
    const categoryColors = {
        Work: 'bg-pink-500',
        Wishlist: 'bg-orange-500',
        Assignment: 'bg-blue-500',
        Projects: 'bg-teal-500',
        Video: 'bg-purple-500',
        Study: 'bg-yellow-500'
    };

    return (
        <div className={`${categoryColors[category]} p-4 rounded-lg shadow-lg text-white`}>
            <div className="flex justify-between">
                <h2 className="font-semibold">{title}</h2>
                <span className="bg-white text-black text-xs rounded-full px-2">{category}</span>
            </div>
            <p className="mt-2 text-sm">{content}</p>
            <div className="flex justify-between text-xs mt-4 opacity-75">
                <span>{time}</span>
                <span>{date}</span>
            </div>
        </div>
    );
};

export default NoteCard;
