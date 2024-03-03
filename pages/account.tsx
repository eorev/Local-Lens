import React, { FormEvent } from 'react'; // Import FormEvent
import { useAuth } from '@/contexts/AuthContext'; // Adjust the import path as necessary
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

const AccountPage = () => {
    const { user } = useAuth();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => { // Type the event parameter
        event.preventDefault();
        // Process form submission here
        console.log('Form submitted');
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
                <div>
                    <label htmlFor="displayName" className="block mb-2">Display Name</label>
                    <input type="text" id="displayName" defaultValue={user?.displayName || ''} className="border px-2 py-1 w-full" />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input type="email" id="email" defaultValue={user?.email || ''} className="border px-2 py-1 w-full" disabled />
                </div>
                {/* Add other form fields as needed */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Update</button>
            </form>
        </div>
    );
};

export default AccountPage;
