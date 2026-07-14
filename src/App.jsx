import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setTimeout(() => setIsVisible(true), delay);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Navbar = () => (
  <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-[#050505]/50 backdrop-blur-md">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <Link to="/" className="text-white font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
        Vibelist<span className="text-indigo-500">.in</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/about" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">About Us</Link>
        <Link to="/contact" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Contact Us</Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="w-full border-t border-white/5 py-10 px-6 mt-10 z-20 relative bg-[#050505]">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-neutral-500 text-sm">
        &copy; {new Date().getFullYear()} Vibelist.in. All rights reserved.
      </div>
      <div className="flex gap-6">
        <Link to="/privacy" className="text-sm text-neutral-500 hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-indigo-500/30 relative flex flex-col overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      {/* Animated Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-6 py-32 max-w-6xl mx-auto w-full">
        <FadeIn delay={0} className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-400 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> Choose Your Path
          </div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-white mb-6 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-pulse">Vibelist.in</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            The hyper-local economy connecting creators and businesses. 
            Join thousands of others making a real impact in their community.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* Creator Box */}
          <FadeIn delay={200}>
            <div className="group relative p-1 rounded-[2.5rem] overflow-hidden transition-transform duration-500 hover:-translate-y-4 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/50 via-purple-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <div className="relative h-full flex flex-col items-center text-center p-10 md:p-14 rounded-[2.4rem] bg-[#0a0a0f]/90 border border-white/10 backdrop-blur-xl z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="w-20 h-20 mb-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <span className="text-4xl">📸</span>
                </div>
                <h2 className="text-3xl font-medium text-white mb-4">I am a Creator</h2>
                <p className="text-neutral-400 leading-relaxed mb-10 flex-1">
                  Turn your local visits into cash. Get paid for making videos and promoting venues, no matter your follower count or reach.
                </p>
                <Link to="/creator" className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-indigo-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:scale-[1.02]">
                  Enter as Creator
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Partner Box */}
          <FadeIn delay={400}>
            <div className="group relative p-1 rounded-[2.5rem] overflow-hidden transition-transform duration-500 hover:-translate-y-4 h-full">
              <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/50 via-teal-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <div className="relative h-full flex flex-col items-center text-center p-10 md:p-14 rounded-[2.4rem] bg-[#0a0a0f]/90 border border-white/10 backdrop-blur-xl z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="w-20 h-20 mb-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                  <span className="text-4xl">🏪</span>
                </div>
                <h2 className="text-3xl font-medium text-white mb-4">I am a Business</h2>
                <p className="text-neutral-400 leading-relaxed mb-10 flex-1">
                  Stop chasing vanity metrics. Bring real people and guaranteed foot traffic straight to your door with trusted local micro-creators.
                </p>
                <Link to="/partners" className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-emerald-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:scale-[1.02]">
                  Enter as Partner
                </Link>
              </div>
            </div>
          </FadeIn>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
