'use client'; // Komponen hanya dijalankan di sisi klien

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db, ref, onValue, push, remove, update } from '../../../../config/firebase';
import { getAuth } from 'firebase/auth';
import Header from './Header';
import NoteCard from './NoteCard';

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingNote, setEditingNote] = useState(null);

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

    // Mengambil data catatan dari Firebase
    useEffect(() => {
        if (user) {
            const notesRef = ref(db, `notes/${user.uid}`);
            onValue(notesRef, (snapshot) => {
                const notesData = snapshot.val() || {};
                const loadedNotes = [];

                Object.keys(notesData).forEach((category) => {
                    const categoryNotes = notesData[category];
                    Object.keys(categoryNotes).forEach((noteId) => {
                        loadedNotes.push({
                            noteId,
                            ...categoryNotes[noteId],
                            category,
                        });
                    });
                });

                setNotes(loadedNotes);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [user]);

    // Menambahkan catatan baru
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

        const notesRef = ref(db, `notes/${user.uid}/${category}`);
        push(notesRef, newNote)
            .then(() => {
                setNotes([...notes, newNote]);
                setTitle('');
                setContent('');
                setCategory('');
            })
            .catch((error) => console.error('Error adding note:', error));
    };

    // Mengupdate catatan
    const updateNote = (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Title and content are required!');
            return;
        }
    
        if (!user) {
            alert('You must be logged in to update notes.');
            return;
        }
    
        // Menggunakan ID catatan yang sudah ada (noteId)
        const updatedNote = {
            noteId: editingNote.noteId, // Pastikan menggunakan noteId yang sudah ada
            title,
            content,
            userId: user.uid,
            category: editingNote.category,
        };
    
        const noteRef = ref(db, `notes/${user.uid}/${editingNote.category}/${editingNote.noteId}`);
        update(noteRef, updatedNote)
            .then(() => {
                // Update state dengan data yang baru tanpa menambahkan data baru
                const updatedNotes = notes.map((note) =>
                    note.noteId === editingNote.noteId ? { ...note, ...updatedNote } : note
                );
                setNotes(updatedNotes);
                setTitle('');
                setContent('');
                setEditingNote(null);
            })
            .catch((error) => console.error('Error updating note:', error));
    };
    

    // Menghapus catatan
    const deleteNote = (noteId, category) => {
        if (!user) {
            alert('You must be logged in to delete notes.');
            return;
        }

        const noteRef = ref(db, `notes/${user.uid}/${category}/${noteId}`);
        remove(noteRef)
            .then(() => {
                const remainingNotes = notes.filter((note) => note.noteId !== noteId);
                setNotes(remainingNotes);
            })
            .catch((error) => console.error('Error deleting note:', error));
    };

    // Mengedit catatan
    const handleEdit = (note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    return (
        <div className="flex flex-col h-screen bg-white text-gray-800">
            <Header />

            <div className="p-4">
                {isLoading ? (
                    <div>Loading...</div>
                ) : notes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notes
                            .filter((note) => note.category === category || category === '')
                            .map((note) => (
                                <NoteCard
                                    key={note.noteId}
                                    title={note.title}
                                    category={note.category}
                                    content={note.content}
                                    onDelete={() => deleteNote(note.noteId, note.category)}
                                    onEdit={() => handleEdit(note)}
                                />
                            ))}
                    </div>
                ) : (
                    <div>No notes available</div>
                )}
            </div>

            <form
                onSubmit={editingNote ? updateNote : addNote}
                className="p-4 bg-white rounded-lg shadow-md"
            >
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

                {!editingNote && (
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
                )}

                <button
                    type="submit"
                    className="bg-yellow-400 text-slate-800 p-3 rounded-lg w-full hover:bg-slate-700 hover:text-white transition-all"
                >
                    {editingNote ? 'Update Note' : 'Add Note'}
                </button>
            </form>
        </div>
    );
}

export default Dashboard;
