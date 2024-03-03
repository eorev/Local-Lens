// account.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth, signOut, User } from "firebase/auth";
import Image from 'next/image';
import { useRouter } from 'next/router';

const AccountPage = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState({ notifications: false, party: 'democrat' });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/');
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handlePreferencesChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmitPreferences = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Saving preferences...', preferences);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Signed out successfully');
      router.push('/');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      {user ? (
        <>
          <div className="rounded-full overflow-hidden w-24 h-24 mb-4">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="User Avatar"
                width={100}
                height={100}
                layout="responsive"
              />
            )}
          </div>
          <h1 className="text-primary-content text-lg font-bold">Welcome, {user.displayName}</h1>
          <p className="text-copy">Email: {user.email}</p>
          <form className="flex flex-col items-center gap-2 mt-4" onSubmit={handleSubmitPreferences}>
            <label className="text-copy-light">
              Party Preference
              <select name="party" onChange={handlePreferencesChange} value={preferences.party} className="ml-2 bg-foreground border border-border rounded-md text-copy">
                <option value="democrat">Democrat</option>
                <option value="republican">Republican</option>
                <option value="nonpartisan">NonPartisan</option>
              </select>
            </label>
            <label className="text-copy-light">
              Notifications:
              <input type="checkbox" name="notifications" checked={preferences.notifications} onChange={handlePreferencesChange} className="ml-2" />
            </label>
            <button type="submit" className="mt-2 px-4 py-2 bg-primary text-primary-content rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-light">Save Preferences</button>
          </form>
          <button onClick={handleSignOut} className="mt-2 px-4 py-2 bg-secondary text-secondary-content rounded-md hover:bg-secondary-dark focus:outline-none focus:ring focus:ring-secondary-light">Sign Out</button>
        </>
      ) : null}
    </div>
  );
};

export default AccountPage;
