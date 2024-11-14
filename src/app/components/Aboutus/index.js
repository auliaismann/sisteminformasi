import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="py-16" >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-purple-900">About Us</h2>
        <p className="text-lg text-gray-700 mt-5 mb-10">
          EduNotes is your ultimate knowledge management platform, designed to help you organize, collaborate, and access your knowledge with ease.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Mission */}
          <div className="flex flex-col items-center p-8 bg-[#FBF4E2] rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105">
            <div className="mb-4 w-16 h-16 bg-[#B4D51E] rounded-full flex items-center justify-center text-white shadow-lg">
              <span className="text-xl font-bold">01</span>
            </div>
            <h3 className="text-2xl font-semibold text-purple-900">Our Mission</h3>
            <p className="text-gray-600 mb-4">
              To empower individuals to organize their knowledge, connect with others, and unlock new opportunities for learning.
            </p>
            <a href="/components/ContactUs" className="text-yellow-400 hover:text-purple-900 font-semibold">Learn More</a>
          </div>

          {/* Vision */}
          <div className="flex flex-col items-center p-8 bg-[#FBF4E2] text-white rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105">
            <div className="mb-4 w-16 h-16 bg-[#B4D51E] rounded-full flex items-center justify-center text-white shadow-lg">
              <span className="text-xl font-bold">02</span>
            </div>
            <h3 className="text-2xl font-semibold text-purple-900">Our Vision</h3>
            <p className="text-gray-600 mb-4">
              To become the leading platform for knowledge sharing, fostering a community of lifelong learners.
            </p>
            <a href="/components/ContactUs" className="text-yellow-400 hover:text-purple-900 font-semibold">Learn More</a>
          </div>

          {/* Values */}
          <div className="flex flex-col items-center p-8 bg-[#FBF4E2] text-white rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105">
            <div className="mb-4 w-16 h-16 bg-[#B4D51E] rounded-full flex items-center justify-center text-white shadow-lg">
              <span className="text-xl font-bold">03</span>
            </div>
            <h3 className="text-2xl font-semibold text-purple-900">Our Values</h3>
            <p className="text-gray-600 mb-4">
              Integrity, collaboration, and innovation are at the core of everything we do, driving us to continuously improve and innovate.
            </p>
            <a href="/components/ContactUs" className="text-yellow-400 hover:text-purple-900 font-semibold">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
