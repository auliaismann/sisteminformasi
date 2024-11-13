import React, { useState } from 'react';
import Note from './Note';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Fungsi untuk menambahkan catatan
    const addNote = (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert("Title and content are required!");
            return;
        }
        const newNote = { id: Date.now(), title, content }; // menggunakan ID unik
        setNotes([...notes, newNote]);
        setTitle('');
        setContent('');
    };

    return (
        <div className="dashboard-container">
            <h1 className="text-xl font-bold mb-4">Dashboard</h1>
            <form onSubmit={addNote} className="mb-6">
                <div className="mb-4">
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="border p-2 w-full rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <textarea 
                        placeholder="Content" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        className="border p-2 w-full rounded-md"
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Add Note
                </button>
            </form>
            <div className="notes-list">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <Note key={note.id} title={note.title} content={note.content} />
                    ))
                ) : (
                    <p>No notes available. Add a note to get started.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
