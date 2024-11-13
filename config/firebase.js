import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, remove, update } from "firebase/database"; // Import untuk Realtime Database
import { getAuth } from 'firebase/auth'; // Untuk Auth

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0YxycKoilFPH3z19cKj0S3h5JmGDz0Eg",
  authDomain: "sisfor-632e9.firebaseapp.com",
  databaseURL: "https://sisfor-632e9-default-rtdb.firebaseio.com",
  projectId: "sisfor-632e9",
  storageBucket: "sisfor-632e9.firebasestorage.app",
  messagingSenderId: "114798850925",
  appId: "1:114798850925:web:d6b2bebddd141bcd50a064",
  measurementId: "G-5STR8CVG3J"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);  // Initialize auth

export { db, ref, onValue, push, remove, update, auth }; // Export auth as well
