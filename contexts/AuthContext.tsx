import React from "react";
import {
    GoogleAuthProvider,
    User,
    onAuthStateChanged,
    signInWithPopup
} from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { auth, logout } from "@/lib/firebase/firebase";
import { useRouter } from 'next/router';

type AuthContextProviderProps = {
    children: React.ReactNode;
};

interface AuthContextType {
    user?: User | null;
    googleSignIn: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: undefined, // Initially, user might not be logged in
    googleSignIn: () => { },
    logout: () => { },
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logout = async () => {
        await logout(); // This should call the logout function imported from '@/lib/firebase/firebase'
        router.push('/login'); // Redirect to login page after logout
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsub();
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const UserAuth = (): AuthContextType => {
    return useContext(AuthContext);
};  