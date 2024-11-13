import React from 'react';

const NoteCard = ({ title, category, content, onDelete, onEdit }) => {
    const categoryColors = {
        Assignments: 'bg-pink-500',
        Schedule: 'bg-orange-500',
        Exam: 'bg-blue-500',
        Project: 'bg-teal-500',
        Resources: 'bg-purple-500',
        Goals: 'bg-yellow-500'
    };

    return (
        <div className={`${categoryColors[category]} p-4 rounded-lg shadow-lg text-white relative`}>
            <div className="flex justify-between items-center">
                <h2 className="font-semibold">{title}</h2>
                <span className="bg-white text-black text-xs rounded-full px-3 py-1">{category}</span>
            </div>
            <p className="mt-2 text-sm">{content}</p>

            <div className="absolute bottom-2 right-4 flex space-x-2">
                <button
                    onClick={onEdit}
                    className="bg-blue-500 text-white text-xs rounded-full px-3 py-1 hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="bg-red-500 text-white text-xs rounded-full px-3 py-1 hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default NoteCard;
