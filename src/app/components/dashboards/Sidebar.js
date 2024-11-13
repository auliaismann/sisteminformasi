const Sidebar = ({ setCategory, categories }) => {
    return (
        <div className="w-64 bg-gray-800 text-gray-200 p-4">
            <h2 className="text-xl mb-4">Categories</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        <button
                            className="w-full text-left p-2 hover:bg-gray-700"
                            onClick={() => setCategory(category)}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
