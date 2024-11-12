import React from 'react'
import Image from 'next/image'
import { logo2 } from '../../../../public'
import Link from 'next/link'

const Navbar = () => {
  return (
    <section>
      <div>
        <nav className='pt-6 pr-10 pl-10 pb-4 mb-8 flex justify-between items-center'>
          <Image src={logo2} alt='Logo' width={120} height={40}/>

          <ul className='flex items-center space-x-6'>
            <li>
              <a href='#home' className='text-gray-700 hover:text-gray-900'>Home</a>
              </li>
            <li>
              <a href='#about' className='text-gray-700 hover:text-gray-900'>About Us</a>
              </li>
            <li>
              <a href='#features' className='text-gray-700 hover:text-gray-900'>Features</a>
              </li>
            <li>
              <a href='#'className='button-bg-secondary text-white px-4 py-2 rounded-md'>Contact Us</a></li>
          </ul>
        </nav>
      </div>

    </section>
  )
}

export default Navbar