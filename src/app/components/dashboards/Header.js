'use client';  // Ensure this is a client-side component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, ref, onValue } from '../../../../config/firebase'; // Import Realtime Database
import Image from 'next/image';
import { logo2 } from '../../../../public';  // Import logo image (adjust the path as needed)

const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);  // State to store user information
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Fetch additional user info from Realtime Database
                const userRef = ref(db, `users/${currentUser.uid}`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();
                    setUser({
                        displayName: userData?.displayName || currentUser.displayName,  // Merge data
                        photoURL: userData?.photoURL || currentUser.photoURL,  // Merge data
                    });
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleProfileClick = () => {
        router.push('/components/profil'); 
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
