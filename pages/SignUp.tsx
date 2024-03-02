import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, AuthError } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useRouter } from 'next/router';

const SignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            const userDoc = doc(getFirestore(), "users", user.uid);
            await setDoc(userDoc, {
                experience: 0,
                level: 1,
                username: username,
            });

            alert("Account created successfully.");
            router.push('/index');
        } catch (error) {
            if (error instanceof Error) { // Type-check the error
                alert(error.message);
            } else {
                console.error("An unexpected error occurred", error);
            }
        }
    };

    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Optionally, check if the user is new and save their data to Firestore
            const userDocRef = doc(getFirestore(), "users", user.uid);
            setDoc(userDocRef, {
                experience: 0,
                level: 1,
                username: user.displayName, // Or ask the user for a username
            }, { merge: true });

            alert("Google account sign-in successful.");
        } catch (error) {
            if (error instanceof Error) { // Type-check the error
                alert(error.message);
            } else {
                console.error("An unexpected error occurred", error);
            }
        }
    };

    return (
        <div className="m-10">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={handleGoogleSignUp} style={{ marginTop: "10px" }}>Sign Up with Google</button>
        </div>
    );
};

export default SignUp;
