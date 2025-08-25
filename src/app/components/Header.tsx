'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">HIPE</span>
          <span className="text-gray-800">G</span>
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-purple-600 transition duration-300">Home</a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition duration-300">Chi Siamo</a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition duration-300">Servizi</a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition duration-300">Contatti</a>
        </nav>
        
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition duration-300">Home</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition duration-300">Chi Siamo</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition duration-300">Servizi</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition duration-300">Contatti</a>
          </nav>
        </div>
      )}
    </header>
  );
}