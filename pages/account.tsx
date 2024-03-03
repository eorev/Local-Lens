// account.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth, signOut, User } from "firebase/auth";
import Image from 'next/image'; // Ensure you're importing Image from Next.js

const AccountPage = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Handle successful sign out
      })
      .catch((error) => {
        // Handle sign out error
      });
  };

  const styles = {
    container: {
      textAlign: 'center' as const,
      marginTop: '50px',
    },
    button: {
      marginTop: '20px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      {user ? (
        <div>
          {/* Use the Image component with required width and height */}
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt="User Avatar"
              width={100} // Set width
              height={100} // Set height
              style={{ borderRadius: '50%' }} // Apply styles as needed
            />
          )}
          <h1>Welcome, {user.displayName}</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleSignOut} style={styles.button}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h1>Please sign in</h1>
          {/* Add sign in form here */}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
