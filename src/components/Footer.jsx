import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 py-10 px-6 z-20 relative bg-[#050505]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-neutral-500 text-sm">
          2026 Vibelist Copyright
        </div>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-sm text-neutral-500 hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
