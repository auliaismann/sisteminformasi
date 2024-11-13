import React from 'react';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-semibold">All Notes</h1>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">Add New Note</button>
        </header>
    );
};

export default Header;
