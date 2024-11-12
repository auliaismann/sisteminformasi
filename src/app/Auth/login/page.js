'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../../config/firebase'; // Pastikan path benar
import { signInWithEmailAndPassword } from 'firebase/auth'; // Impor signInWithEmailAndPassword dari firebase/auth

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Validasi input sebelum memproses login
    if (!email || !password) {
      setError('Email dan Password tidak boleh kosong.');
      return;
    }

    // Validasi format email dengan regex sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format email tidak valid.');
      return;
    }

    // Memanggil signInWithEmailAndPassword dengan benar
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Setelah berhasil login, redirect ke halaman dashboard atau halaman lain
        router.push('/dashboard');  // Ganti dengan path tujuan setelah login
      })
      .catch((err) => {
        // Tangani error berdasarkan kode error
        switch (err.code) {
          case 'auth/user-not-found':
            setError('Akun dengan email ini tidak ditemukan. Silakan daftar terlebih dahulu.');
            break;
          case 'auth/wrong-password':
            setError('Password yang Anda masukkan salah.');
            break;
          case 'auth/invalid-credential':
            setError('Pastikan email dan password sudah benar.');
            break;
          case 'auth/too-many-requests':
            setError('Terlalu banyak percobaan login. Coba lagi nanti.');
            break;
          default:
            setError('Terjadi kesalahan, silakan coba lagi.');
            break;
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

        {/* Menampilkan error jika ada */}
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

        <p className="mt-4 text-center">
          Don't have an account? <a href="/Auth/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
