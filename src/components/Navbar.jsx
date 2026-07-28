import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

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
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden relative z-[60] w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? 'translate-y-[4.5px] rotate-45' : ''}`}></span>
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? '-translate-y-[4.5px] -rotate-45' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`sm:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className={`sm:hidden fixed top-0 right-0 h-full w-72 bg-[#0a0a0a] border-l border-white/10 z-[58] transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col pt-24 px-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg font-medium py-4 border-b border-white/5 transition-all duration-300 ${location.pathname === link.to ? 'text-white' : 'text-neutral-400 hover:text-white'} ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
              style={{ transitionDelay: isOpen ? `${100 + i * 75}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className={`absolute bottom-12 left-8 right-8 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: isOpen ? '350ms' : '0ms' }}>
          <Link
            to="/creator"
            className="block w-full py-3 rounded-lg bg-white text-black text-center text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            Enter as Creator
          </Link>
          <Link
            to="/partners"
            className="block w-full py-3 mt-3 rounded-lg border border-white/15 text-white text-center text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Enter as Partner
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
