
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        headerRef.current.classList.add('bg-black/80', 'backdrop-blur-md', 'shadow-lg');
        headerRef.current.classList.remove('bg-transparent');
      } else {
        headerRef.current.classList.remove('bg-black/80', 'backdrop-blur-md', 'shadow-lg');
        headerRef.current.classList.add('bg-transparent');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent px-6 md:px-10 py-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-valorant text-white mr-2 animate-pulse-glow">
            T
          </span>
          <h1 className="text-xl font-valorant text-white tracking-wider">
            TEAM TRAGIC
          </h1>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="nav-link text-white/90 hover:text-white transition-colors">
            HOME
          </Link>
          <Link to="/" className="nav-link text-white/90 hover:text-white transition-colors">
            ROSTER
          </Link>
          <Link to="/" className="nav-link text-white/90 hover:text-white transition-colors">
            TOURNAMENTS
          </Link>
          <Link to="/admin" className="nav-link text-white/90 hover:text-white transition-colors">
            ADMIN
          </Link>
        </nav>
        
        <div className="flex md:hidden">
          <button 
            aria-label="Menu"
            className="text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
