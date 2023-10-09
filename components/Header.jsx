'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '@/services';
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const [categories, setCategories] = useState([])

  useEffect(() => {
      getCategories().then((result) => setCategories(result))
  }, [])


  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 mb-8'>
      <div className='flex md:flex-row justify-between border-b w-full border-fuchsia-800 py-4 md:py-8'>
        <div className='flex items-center'>
          <Link href='/'>
            <span className='text-2xl font-bold cursor-pointer'>V~Tech</span>
          </Link>
        </div>
        <div className='mt-4 md:mt-0 hidden md:flex gap-4'>
          {categories.map((category, index) => (
            <Link href={`/${category.slug}`} key={index}>
              <span className='text-gray-600 hover:text-gray-800 cursor-pointer font-medium transition duration-300 ease-in-out'>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        <div className='mt-4 md:hidden flex gap-4'>
          <button onClick={toggleMobileMenu}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className='mt-4 md:hidden'>
          <ul className='text-gray-600 font-medium'>
            {categories.map((category, index) => (
              <li key={index} className='mb-2'>
                <Link href={`/${category.slug}`}>
                  <span
                    onClick={toggleMobileMenu}
                    className='block hover:text-gray-800 transition duration-300 ease-in-out'
                  >
                    {category.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Additional mobile menu items can be added here */}
        </div>
      )}
    </div>
  );
};

export default Header;
