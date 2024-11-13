// Note.js
import React from 'react';

const Note = ({ title, content }) => {
    return (
        <div className="border p-4 mb-4 rounded-md shadow-md">
            <h2 className="font-semibold text-lg">{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default Note;
