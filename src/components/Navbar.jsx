import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="text-white font-semibold text-xl tracking-tight hover:opacity-80 transition-opacity">
          Vibelist
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Contact</Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden relative w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? 'translate-y-[4.5px] rotate-45' : ''}`}></span>
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? '-translate-y-[4.5px] -rotate-45' : ''}`}></span>
          </div>
        </button>
      </div>

      <div className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 flex flex-col gap-1">
          <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/5">Home</Link>
          <Link to="/about" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/5">About</Link>
          <Link to="/contact" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/5">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
