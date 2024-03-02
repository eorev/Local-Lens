import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from 'next/router';

const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);

            // Redirect after successful sign in
            router.push('/'); // Adjust the redirection path as needed
        } catch (error) {
            if (error instanceof Error) { // Type-check the error
                alert(error.message);
            } else {
                console.error("An unexpected error occurred", error);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);

            // Redirect after successful Google sign in
            router.push('/index'); // Adjust the redirection path as needed
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
            <h1>Sign In</h1>
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
                <button type="submit">Sign In</button>
            </form>
            <button onClick={handleGoogleSignIn} style={{ marginTop: "10px" }}>Sign In with Google</button>
        </div>
    );
};

export default SignIn;
