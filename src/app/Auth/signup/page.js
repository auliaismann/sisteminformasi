'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../../config/firebase'; // Pastikan path benar
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Impor createUserWithEmailAndPassword dari firebase/auth
import { FaArrowLeft } from 'react-icons/fa'; // Impor ikon panah kiri

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Reset error state

      // Mendaftar pengguna baru dengan email dan password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Setelah berhasil daftar, arahkan ke halaman login atau dashboard
      router.push('/Auth/login'); // Ganti dengan path halaman login

    } catch (err) {
      // Tangani error dan tampilkan pesan kesalahan
      setError(err.message);
    }
  };

  // Fungsi untuk menangani klik tombol kembali
  const handleBack = () => {
    router.back(); // Navigasi kembali ke halaman sebelumnya
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {/* Tombol kembali */}
      <button 
        onClick={handleBack} 
        className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300">
        <FaArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      <div className="w-96 p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <a href="/Auth/login" className="text-blue-500">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
