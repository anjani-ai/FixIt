"use client";
import { useEffect, useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "../lib/firebase";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

export default function Home() {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">FixIt 🛠️</h1>
      {!user ? (
        <button onClick={handleSignIn} className="px-6 py-3 bg-blue-600 text-white rounded-xl">
          Sign in with Google
        </button>
      ) : (
        <>
          <p className="mb-4">Hello, {user.displayName}</p>
          <button onClick={handleSignOut} className="px-4 py-2 bg-red-500 text-white rounded-xl mb-6">
            Sign Out
          </button>
          {isLoaded ? (
            <GoogleMap
              center={{ lat: 17.385044, lng: 78.486671 }}
              zoom={12}
              mapContainerClassName="w-full h-96"
            />
          ) : (
            <p>Loading map...</p>
          )}
        </>
      )}
    </main>
  );
}
