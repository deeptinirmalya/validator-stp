import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FadeIn from './components/FadeIn';

const PersonIcon = ({ className }) => (
  <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="40" r="20" />
    <line x1="50" y1="60" x2="50" y2="130" />
    <line x1="50" y1="80" x2="20" y2="110" />
    <line x1="50" y1="80" x2="80" y2="110" />
    <line x1="50" y1="130" x2="20" y2="190" />
    <line x1="50" y1="130" x2="80" y2="190" />
  </svg>
);

const ProcessAnimation = () => (
  <section className="w-full py-32 px-6 flex flex-col items-center justify-center relative z-10 bg-[#0a0a0f]/50 border-t border-white/5">
    <FadeIn delay={0}>
      <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-24 text-center">
        How <span className="text-white">Vibelist</span> Connects You
      </h2>
    </FadeIn>

    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto gap-8 md:gap-0">

      <FadeIn delay={200} className="flex flex-col items-center z-10 w-48">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-4">
          <PersonIcon className="w-10 h-20 text-neutral-300" />
        </div>
        <span className="text-white font-medium text-lg">Creator</span>
        <span className="text-neutral-500 text-sm">Makes Content</span>
      </FadeIn>

      <FadeIn delay={400} className="hidden md:flex flex-1 items-center justify-center relative h-24">
        <svg className="w-full h-8 overflow-visible">
          <line x1="0" y1="16" x2="100%" y2="16" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8" className="text-neutral-700 flow-line" />
        </svg>
      </FadeIn>

      <FadeIn delay={600} className="flex flex-col items-center z-10 w-48">
        <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center border border-white/20 mb-4">
          <PersonIcon className="w-14 h-28 text-white" />
        </div>
        <span className="text-xl font-bold text-white">Vibelist</span>
        <span className="text-neutral-500 text-sm">The Middleman</span>
      </FadeIn>

      <FadeIn delay={800} className="hidden md:flex flex-1 items-center justify-center relative h-24">
        <svg className="w-full h-8 overflow-visible">
          <line x1="0" y1="16" x2="100%" y2="16" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8" className="text-neutral-700 animate-[dash_40s_linear_infinite]" />
        </svg>
      </FadeIn>

      <FadeIn delay={1000} className="flex flex-col items-center z-10 w-48">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-4">
          <PersonIcon className="w-10 h-20 text-neutral-300" />
        </div>
        <span className="text-white font-medium text-lg">Business</span>
        <span className="text-neutral-500 text-sm">Gets Customers</span>
      </FadeIn>

    </div>

    <style>{`
      @keyframes dash {
        to {
          stroke-dashoffset: -1000;
        }
      }
    `}</style>
  </section>
);

const App = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-white/30 relative flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-6 py-28 max-w-6xl mx-auto w-full">
        <FadeIn delay={0} className="text-center mb-20 relative z-10">
          <h1 className="text-6xl sm:text-7xl md:text-[6rem] font-semibold tracking-tight text-white mb-6 leading-[0.92]">
            Vibelist
          </h1>
          <p className="text-neutral-300 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
            Your AI creative studio built with local creators and businesses in mind.
          </p>
          <Link to="/creator" className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-black shadow-[0_20px_60px_rgba(255,255,255,0.08)] transition hover:shadow-[0_24px_80px_rgba(255,255,255,0.12)]">
            Create with Vibelist
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

          <FadeIn delay={200}>
            <div className="group relative p-1 rounded-[2.5rem] overflow-hidden transition-transform duration-300 hover:-translate-y-2 h-full">
              <div className="relative h-full flex flex-col items-center text-center p-10 md:p-14 rounded-[2.4rem] bg-black border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                <div className="w-20 h-20 mb-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-medium text-white mb-4">I am a Creator</h2>
                <p className="text-neutral-400 leading-relaxed mb-10 flex-1">
                  Turn your local visits into cash. Get paid for making videos and promoting venues, no matter your follower count or reach.
                </p>
                <Link to="/creator" className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-all duration-300">
                  Enter as Creator
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="group relative p-1 rounded-[2.5rem] overflow-hidden transition-transform duration-300 hover:-translate-y-2 h-full">
              <div className="relative h-full flex flex-col items-center text-center p-10 md:p-14 rounded-[2.4rem] bg-black border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                <div className="w-20 h-20 mb-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h2 className="text-3xl font-medium text-white mb-4">I am a Business</h2>
                <p className="text-neutral-400 leading-relaxed mb-10 flex-1">
                  Stop chasing vanity metrics. Bring real people and guaranteed foot traffic straight to your door with trusted local micro-creators.
                </p>
                <Link to="/partners" className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-all duration-300">
                  Enter as Partner
                </Link>
              </div>
            </div>
          </FadeIn>

        </div>
      </main>

      <section className="w-full py-24 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500 mb-6">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-12">What creators and partners say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-left shadow-[0_20px_40px_rgba(255,255,255,0.05)]">
              <p className="text-lg text-neutral-100 leading-relaxed mb-6">
                “Vibelist helped me earn more from local creator work than any other platform. The onboarding was seamless, and the support from local businesses made it easy to keep creating.”
              </p>
              <div className="text-white font-semibold text-base">Riya Sharma</div>
              <div className="text-neutral-500 text-sm">Creator, Mumbai</div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-left shadow-[0_20px_40px_rgba(255,255,255,0.05)]">
              <p className="text-lg text-neutral-100 leading-relaxed mb-6">
                “The platform makes it easy to discover high-quality local creators. We’ve seen a measurable increase in walk-in traffic and positive engagement after every campaign.”
              </p>
              <div className="text-white font-semibold text-base">Amit Verma</div>
              <div className="text-neutral-500 text-sm">Business Owner, Delhi</div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-left shadow-[0_20px_40px_rgba(255,255,255,0.05)]">
              <p className="text-lg text-neutral-100 leading-relaxed mb-6">
                “I loved how simple it was to start. Vibelist connects me to real people who care about my content, not just vanity metrics.”
              </p>
              <div className="text-white font-semibold text-base">Neha Patel</div>
              <div className="text-neutral-500 text-sm">Creator, Bangalore</div>
            </div>
          </div>
        </div>
      </section>

      <ProcessAnimation />

      <Footer />
    </div>
  );
};

export default App;
