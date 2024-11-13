'use client';  // Ensure this is a client-side component

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db, ref, onValue, push, remove, update } from '../../../../config/firebase';
import { getAuth } from 'firebase/auth';
import Header from './Header';
import NoteCard from './NoteCard';

function Dashboard() {
    const [notes, setNotes] = useState([]);  // Stores notes to display
    const [title, setTitle] = useState('');  // Stores note title
    const [content, setContent] = useState('');  // Stores note content
    const [category, setCategory] = useState('');  // Selected category
    const [categories, setCategories] = useState([]);  // List of categories
    const [isLoading, setIsLoading] = useState(true);  // Set initial loading state to true
    const [editingNote, setEditingNote] = useState(null);  // Stores the note that is being edited

    const auth = getAuth();
    const user = auth.currentUser;

    const predefinedCategories = [
        'Assignments',
        'Schedule',
        'Exam',
        'Project',
        'Resources',
        'Goals',
    ];

    // Effect to fetch categories and notes from Firebase
    useEffect(() => {
        if (user) {
            const notesRef = ref(db, `notes/${user.uid}`);
            onValue(notesRef, (snapshot) => {
                const notesData = snapshot.val() || {};
                const loadedNotes = Object.keys(notesData).map(key => {
                    return { id: key, ...notesData[key] };  // Add ID to each note
                });
                setNotes(loadedNotes);
                setIsLoading(false);  // Set loading state to false after fetching data
            });
        }
    }, [user]);

    const addNote = (e) => {
        e.preventDefault();
        if (!title || !content || !category) {
            alert('Title, content, and category are required!');
            return;
        }

        if (!user) {
            alert('You must be logged in to add notes.');
            return;
        }

        const newNote = {
            id: uuidv4(),
            title,
            content,
            userId: user.uid,
            category,
        };

        // Save the new note under the user's uid and category
        const notesRef = ref(db, `notes/${user.uid}/${category}/${newNote.id}`);
        push(notesRef, newNote).then(() => {
            setNotes([...notes, newNote]); // Update the local state with the new note
            setTitle('');
            setContent('');
            setCategory('');
        }).catch((error) => {
            console.error('Error adding note:', error);
        });
    };

    const updateNote = (e) => {
        e.preventDefault();
        if (!title || !content || !category || !editingNote) {
            alert('Title, content, category, and note are required!');
            return;
        }

        if (!user) {
            alert('You must be logged in to edit notes.');
            return;
        }

        const updatedNote = {
            title,
            content,
            category,
        };

        // Firebase update reference
        const noteRef = ref(db, `notes/${user.uid}/${category}/${editingNote.id}`);
        update(noteRef, updatedNote).then(() => {
            // Update the local state
            setNotes(notes.map(note => note.id === editingNote.id ? { ...note, ...updatedNote } : note));
            setEditingNote(null);  // Reset editing note state
            setTitle('');
            setContent('');
            setCategory('');
        }).catch((error) => {
            console.error('Error updating note:', error);
        });
    };

    // Function to delete a note
    const deleteNote = (noteId, category) => {
        if (!user) {
            alert('You must be logged in to delete notes.');
            return;
        }

        const noteRef = ref(db, `notes/${user.uid}/${category}/${noteId}`);
        remove(noteRef).then(() => {
            setNotes(notes.filter((note) => note.id !== noteId)); // Update local state
        }).catch((error) => {
            console.error('Error deleting note:', error);
        });
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
        setCategory(note.category);
    };

    return (
        <div className="flex flex-col h-screen bg-white text-gray-800">
            <Header />

            <div className="p-4">
                {isLoading ? (
                    <div>Loading...</div>  // Show loading state while fetching data
                ) : notes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notes.filter(note => note.category === category || category === '').map((note) => (
                            <NoteCard
                                key={note.id}
                                title={note.title}
                                category={note.category}
                                content={note.content}
                                onDelete={() => deleteNote(note.id, note.category)}  // Pass delete handler to NoteCard
                                onEdit={() => handleEdit(note)}  // Pass edit handler to NoteCard
                            />
                        ))}
                    </div>
                ) : (
                    <div>No notes available</div>
                )}
            </div>

            <form onSubmit={editingNote ? updateNote : addNote} className="p-4 bg-white rounded-lg shadow-md">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note Title"
                    className="w-full p-3 mb-2 rounded-lg text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Note Content"
                    className="w-full p-3 mb-4 rounded-lg text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                    <option value="" disabled>Select Category</option>
                    {[...predefinedCategories, ...categories].map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button type="submit" className="bg-yellow-400 text-slate-800 p-3 rounded-lg w-full hover:bg-slate-700 hover:text-white transition-all">
                    {editingNote ? 'Update Note' : 'Add Note'}
                </button>
            </form>
        </div>
    );
}

export default Dashboard;
