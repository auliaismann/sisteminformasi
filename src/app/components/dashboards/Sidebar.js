import React from 'react';

const Sidebar = () => {
    return (
        <aside className="bg-gray-800 text-white w-64 h-screen p-4">
            <div className="flex items-center mb-8">
                <div className="bg-gray-500 w-12 h-12 rounded-full"></div>
                <span className="ml-4 text-xl font-semibold">Steve Dean</span>
            </div>
            <ul>
                {['Videos', 'Wishlist', 'Assignment', 'Projects', 'Work', 'Study'].map((category, index) => (
                    <li key={index} className="flex justify-between items-center mb-4">
                        <span className="text-gray-300">{category}</span>
                        <span className="bg-purple-600 text-white rounded-full px-3 py-1 text-xs">{index + 1}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
