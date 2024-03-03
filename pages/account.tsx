import React, { FormEvent, useEffect } from 'react';
import { AuthContextProvider, UserAuth } from '@/contexts/AuthContext'; // Adjust the import path as necessary
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router'; // Import useRouter hook from Next.js
import { logout } from '@/lib/firebase/firebase';

const AccountPage = () => {
    const { user, logout } = UserAuth(); // Destructure logout from UserAuth
    const router = useRouter(); // Initialize the router

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted');
    };

    const handleSignOut = async () => {
        await logout();
        router.push('/');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Account Information</h1>
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    {user?.photoURL ? (
                        <Image src={user.photoURL} alt="Profile Picture" width={100} height={100} className="rounded-full" />
                    ) : (
                        <FaUserCircle size="100" />
                    )}
                    <div>
                        <h2 className="text-xl font-semibold">{user?.displayName || 'User'}</h2>
                        <p>{user?.email}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Update</button>
            </form>
            {/* Sign-out button */}
            <button onClick={handleSignOut} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition">Sign Out</button>
        </div>
    );
};

export default AccountPage;