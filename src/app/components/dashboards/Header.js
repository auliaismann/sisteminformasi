'use client';  // Ensure this is a client-side component

import { useState, useEffect } from 'react';  // Import useState and useEffect
import { useRouter } from 'next/navigation';  // Import from next/navigation
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Import from Firebase
import Image from 'next/image';  // Import Image for logo
import { logo2 } from '../../../../public';  // Import logo image (adjust the path as needed)

const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);  // State to store user information

    // Fetch user data after component mounts
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Set user data if logged in
                setUser({
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                });
            } else {
                // Set user to null if not logged in
                setUser(null);
            }
        });

        // Clean up the subscription on component unmount
        return () => unsubscribe();
    }, []);

    const handleProfileClick = () => {
        // Navigate to profile page
        router.push('/profile');  // Update '/profile' with your actual profile page route
    };

    return (
        <header className="bg-[#B4D51E] text-white py-6 px-10 shadow-lg">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <Image src={logo2} alt="Logo" width={120} height={40} />
                </div>

                {/* User profile section */}
                {user && (
                    <div className="flex items-center space-x-4 cursor-pointer p-2 transition-all" onClick={handleProfileClick}>
                        <img 
                            src={user.photoURL || '/default-avatar.png'}  // Use default avatar if photoURL is not available
                            alt="Avatar"
                            className="w-10 h-10"  // Removed 'rounded-full' class
                        />
                        <span className="font-semibold">{user.displayName || 'User'}</span>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
