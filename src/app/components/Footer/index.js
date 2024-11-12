import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Side - Copyright */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} EduNotes. All rights reserved.</p>
          </div>

          {/* Right Side - Links */}
          <div className="text-center md:text-right">
            <ul className="space-y-2">
              <li><a href="#about" className="text-white hover:text-yellow-400">About Us</a></li>
              <li><a href="#features" className="text-white hover:text-yellow-400">Features</a></li>

            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
