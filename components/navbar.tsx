import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Chatbot from "./Chatbot";
import Image from "next/image";
import smallLogo from "@/public/logo-small.png";

const FlyoutNav = () => {
  const [signIn, setSignIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const router = useRouter();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignIn(true);
        setPhotoUrl(user.photoURL ? user.photoURL : "");
      } else {
        setSignIn(false);
      }
    });
  }, [auth]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 text-black 
      transition-all duration-300 ease-out lg:px-12
      ${scrolled
          ? "bg-neutral-950 py-3 shadow-xl text-white"
          : "bg-neutral-950/0 py-6 shadow-none"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo color={`${scrolled ? "white" : "black"}`} />
        <div className="flex gap-6 items-center">
          <Link href="/team">
            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">Team</button>
          </Link>
          {!signIn && (
            <button onClick={signInWithGoogle} className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300">Sign in</button>
          )}
          {signIn && (
            <button
              onClick={() => {
                auth.signOut();
                router.push("/");
              }}
              className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Sign out
            </button>
          )}
          {signIn && photoUrl && (
            <Link href="/account">
              <div className="w-10">
                <Image className="rounded-lg" src={photoUrl} alt="Account" width={40} height={40} layout="responsive" />
              </div>
            </Link>
          )}
        </div>
      </div>
      <Chatbot />
    </nav>
  );
};

const Logo = ({ color = "#252329" }) => {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-2xl font-bold" style={{ color }}>Local Lens</span>
        <Image width={50} height={50} src={smallLogo} alt="logo" unoptimized={true} />
      </div>
    </Link>
  );
};

export default FlyoutNav;
