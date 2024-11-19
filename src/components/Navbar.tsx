import React, { useState } from 'react';


interface prop{
  dark:boolean;
  setDark: (arg0: boolean)=> void;
}
const Navbar :React.FC<prop> = ({setDark, dark}) => {
  // State to manage the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-md dark:bg-neutral-800 backdrop-blur-md border border-white border-opacity-30 rounded-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">
              Dynamic-JSON-Form
            </h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <button className='bg-neutral-900 rounded-full h-7 w-14 text-white dark:text-black dark:bg-white'
            onClick={()=>setDark(!dark)}
            >{dark ? 'Light' : 'Dark'}</button>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition duration-300 dark:text-white"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition duration-300 dark:text-white"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition duration-300 dark:text-white"
            >
              Contact
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu} // Attach the toggle function to the button
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {/* hamburger */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md dark:bg-neutral-800">
          <div className="flex flex-col space-y-4 p-4">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition duration-300 dark:text-white"
              onClick={toggleMenu} // Close the menu when clicking a link
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition duration-300 dark:text-white"
              onClick={toggleMenu}
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition duration-300 dark:text-white"
              onClick={toggleMenu}
            >
              Contact
            </a>
            <button className='bg-neutral-900 rounded-full h-8 w-14 text-white dark:text-black dark:bg-white'
            onClick={()=>setDark(!dark)}
            >{dark ? 'Light' : 'Dark'}</button>
          </div>
        </div>
      )}
    </>
  );
}
export default Navbar;