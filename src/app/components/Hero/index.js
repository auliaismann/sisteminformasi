import React from 'react';

const Hero = () => {
  return (
    <section className="hero bg-[#B4D51E] text-white py-16 md:py-32 rounded-xl">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-neutral-800" >
          Organize Your Knowledge, Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl mb-10 text-">
          Start using EduNotes today and take control of your learning experience.
        </p>
        <a href="/components/ContactUs" className="button-cta bg-yellow-400 text-purple-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-900 hover:text-white transition-all">
          Learn More
        </a>
      </div>
    </section>
  );
};

export default Hero;
