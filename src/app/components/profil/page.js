'use client';  // This ensures that the component is treated as client-side

import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { db, ref, onValue, update } from '../../../../config/firebase';
import Header from '../dashboards/Header';
import { useRouter } from 'next/navigation';

function Profile() {
    const [userInfo, setUserInfo] = useState({
        displayName: '',  // Start with an empty displayName
        email: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const userRef = ref(db, `users/${user.uid}`);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setUserInfo({
                    displayName: data?.displayName || '',
                    email: data?.email || user.email,
                });
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [user]);

    const saveDisplayName = () => {
        if (user && newDisplayName) {
            const userRef = ref(db, `users/${user.uid}`);
            update(userRef, { displayName: newDisplayName })
                .then(() => {
                    setUserInfo({ ...userInfo, displayName: newDisplayName });
                    setIsEditing(false);
                    setNewDisplayName('');
                })
                .catch((error) => {
                    console.error('Error updating display name:', error);
                });
        }
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                alert('Logged out successfully');
                router.push('/');  // Redirect to the home page after logout
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="flex flex-col h-screen bg-white text-gray-800">
            <Header />

            <div className="p-4">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        {/* Back Arrow and Title */}
                        <div className="flex items-center mb-4">
                            <button
                                onClick={() => router.back()}  // Go back to the previous page
                                className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition-all"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-800"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <h2 className="text-2xl font-bold ml-4">Profile</h2>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Name:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={newDisplayName}
                                    onChange={(e) => setNewDisplayName(e.target.value)}
                                    placeholder="Enter new display name"
                                    className="w-full p-3 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            ) : (
                                <p>{userInfo.displayName || 'No display name'}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Email:</label>
                            <p>{userInfo.email}</p>
                        </div>

                        {/* Conditionally show Save or Edit Name button */}
                        <div className="mb-4 flex space-x-4">
                            {isEditing ? (
                                <button
                                    onClick={saveDisplayName}
                                    className="bg-yellow-400 text-slate-800 p-3 rounded-lg hover:bg-slate-700 hover:text-white transition-all"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-yellow-400 text-slate-800 p-3 rounded-lg hover:bg-slate-700 hover:text-white transition-all"
                                >
                                    Edit Name
                                </button>
                            )}

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;