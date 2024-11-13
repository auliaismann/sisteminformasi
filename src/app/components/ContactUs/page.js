"use client";

import React, { useState } from 'react';
import Navbar from '../Navbar';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { db } from '../../../../config/firebase';
import { ref, push } from "firebase/database";

async function addDataToRealtimeDB(nama, email, message) {
  try {
    const messagesRef = ref(db, "messages");
    const newMessageRef = await push(messagesRef, {
      nama: nama,
      email: email,
      message: message,
    });
    console.log("Form written with ID: ", newMessageRef.key);
    return true;
  } catch (error) {
    console.error("Error adding form ", error);
    return false;
  }
}

const ContactUs = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToRealtimeDB(nama, email, message);
    if (added) {
      setNama('');
      setEmail('');
      setMessage('');
      alert("Your message has been successfully sent! Please wait for our reply, we will reply as soon as possible. Thank you, have a nice day :)");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-start justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center bg-[#B4D51E] py-20 px-8 rounded-lg mx-10 max-w-5xl">
          <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/2 mb-8 md:mb-0 md:mr-8">
            <h3 className="text-2xl font-semibold mb-4">Send Us Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-900 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="text-white md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="mb-6">Feel free to contact us! Submit your question and we will answer them as soon as possible.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100037805719528" className="text-white text-2xl"><FaFacebook /></a>
              <a href="https://www.instagram.com/shnceul/" className="text-white text-2xl"><FaInstagram /></a>
              <a href="https://x.com/nunuyana3" className="text-white text-2xl"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;