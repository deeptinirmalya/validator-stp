import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-[#050505]/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
          Vibelist<span className="text-neutral-400">.in</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hidden sm:inline-block text-sm font-medium text-neutral-400 hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="hidden sm:inline-block text-sm font-medium text-neutral-400 hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="hidden sm:inline-block text-sm font-medium text-neutral-400 hover:text-white transition-colors">Contact</Link>

          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
            <button
              onClick={() => changeLanguage('en')}
              className={`text-xs font-medium px-2 py-1 rounded transition-colors ${i18n.language === 'en' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'}`}
            >
              EN
            </button>
            <span className="text-neutral-600 text-xs">|</span>
            <button
              onClick={() => changeLanguage('hi')}
              className={`text-xs font-medium px-2 py-1 rounded transition-colors ${i18n.language === 'hi' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'}`}
            >
              HI
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
