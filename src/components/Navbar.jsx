import React from 'react';

const Navbar = ({ onSelect }) => {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 rounded-2xl">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">My Budget</h1>
        <div className="flex flex-wrap justify-end">
          <NavButton onClick={() => onSelect('home')}>Home</NavButton>
          <NavButton onClick={() => onSelect('about')}>About</NavButton>
          <NavButton onClick={() => onSelect('services')}>Services</NavButton>
          <NavButton onClick={() => onSelect('contact')}>Contact</NavButton>
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
  >
    {children}
  </button>
);

export default Navbar;