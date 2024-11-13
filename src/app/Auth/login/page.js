'use client'; // This line marks the file as a client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaArrowLeft } from 'react-icons/fa'; // Import ikon panah

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email dan Password tidak boleh kosong.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format email tidak valid.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Redirect to the dashboard page after sign-in
        router.push('/components/dashboards'); // Adjust this path based on your file structure
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/user-not-found':
            setError('Akun dengan email ini tidak ditemukan. Silakan daftar terlebih dahulu.');
            break;
          case 'auth/wrong-password':
            setError('Password yang Anda masukkan salah.');
            break;
          default:
            setError('Terjadi kesalahan, silakan coba lagi.');
            break;
        }
      });
  };

  // Fungsi untuk menangani klik tombol kembali
  const handleBack = () => {
    router.back(); // Navigasi kembali ke halaman sebelumnya
  };

  return (
    <div id="login" className="relative flex justify-center items-center min-h-screen">
      {/* Tombol kembali */}
      <button 
        onClick={handleBack} 
        className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300">
        <FaArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      <div className="w-96 p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSignIn}>
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
            Sign In
          </button>
        </form>

        {/* Tambahkan tautan ke halaman Sign Up */}
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a href="/Auth/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
