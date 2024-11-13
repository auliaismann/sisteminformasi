import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import NoteCard from './Notecard';

const Dashboard = () => {
    const notes = [
        { title: 'Client Meeting Review', category: 'Work', time: '09:38PM', date: '07 JANUARY 2021', content: 'Lorem ipsum dolor sit amet...' },
        { title: 'Water Supply Chain Power', category: 'Wishlist', time: '02:45AM', date: '22 DECEMBER 2020', content: 'Lorem ipsum dolor sit amet...' },
        // Tambahkan catatan lain sesuai kebutuhan
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note, index) => (
                        <NoteCard 
                            key={index}
                            title={note.title}
                            category={note.category}
                            time={note.time}
                            date={note.date}
                            content={note.content}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
