import React from 'react'

const Features = () => {
  return (
    <section  id='features'  className='py-20 px-6 bg-purple'>
      <div className='max-w-screen-xl mx-auto text-center'>
        <h2 className='text-4xl font-bold text-purple-900 mb-12'>Our Features</h2>
        <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
          <div className='w-full md:w-1/3 bg-[#FBF4E2] p-8 rounded-xl shadow-lg'>
            <h3 className='text-2xl font-semibold text-purple-900 mb-4'>Feature One</h3>
            <p className='text-purple-900'>
              Organize your notes efficiently and easily. EduNotes helps you create structured notes, saving you time and effort.
            </p>
          </div>
          
          <div className='w-full md:w-1/3 bg-yellow-400 p-8 rounded-xl shadow-lg'>
            <h3 className='text-2xl font-semibold text-purple-900 mb-4'>Feature Two</h3>
            <p className='text-purple-900'>
              Access your notes anytime, anywhere, and on any device. EduNotes is designed to be fully responsive and mobile-friendly.
            </p>
          </div>
          
          <div className='w-full md:w-1/3 bg-[#B4D51E] p-8 rounded-xl shadow-lg'>
            <h3 className='text-2xl font-semibold text-purple-900 mb-4'>Feature Three</h3>
            <p className='text-purple-900'>
              Keep your notes organized and secure with EduNotes. Easily find any note you need with our efficient search function.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
