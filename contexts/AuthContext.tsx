import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    googleSignIn: () => Promise<void>; // Assuming you want to handle this asynchronously
    logout: () => Promise<void>; // Also assuming asynchronous operation for logout
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    googleSignIn: async () => { }, // No-op function for TypeScript conformity
    logout: async () => { }, // No-op function for TypeScript conformity
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // setUser is handled by onAuthStateChanged listener
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        await auth.signOut();
        // setUser to null is handled by onAuthStateChanged listener
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={{ user, googleSignIn, logout }}>{children}</AuthContext.Provider>;
};


export const useAuth = () => useContext(AuthContext);
