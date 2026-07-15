import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const BackgroundAnimation = () => {
  return (
    <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden pointer-events-none opacity-80 -my-10 md:-my-24">
      <div className="relative max-w-5xl mx-auto h-full w-full flex items-center justify-between px-4 md:px-10">

        {/* Brand Side (Left) */}
        <div className="flex flex-col items-center gap-3 z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.15)]">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-indigo-400 tracking-[0.2em] uppercase">Brand</span>
        </div>

        {/* Dotted Line Connection */}
        <div className="absolute left-24 right-24 md:left-32 md:right-32 top-1/2 -translate-y-1/2 flex items-center z-0">
          <svg className="w-full h-4" preserveAspectRatio="none">
            <line
              x1="0" y1="2" x2="100%" y2="2"
              className="stroke-neutral-700/40"
              strokeWidth="2"
              strokeDasharray="6 6"
              style={{ animation: 'dash-flow 1s linear infinite' }}
            />
          </svg>
        </div>

        {/* Creator Side (Right) */}
        <div className="flex flex-col items-center gap-3 z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-purple-400 tracking-[0.2em] uppercase">Creator</span>
        </div>

        {/* Animated Message: Brand to Creator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 text-sm backdrop-blur-xl shadow-xl w-max"
          style={{ animation: 'float-message-brand 8s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          1 Reel + 2 Stories â€¢ 1500
        </div>

        {/* Animated Message: Creator to Brand */}
        <div
          className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 text-sm backdrop-blur-xl shadow-xl w-max"
          style={{ animation: 'float-message-creator 8s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
          <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Done
        </div>

      </div>
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

const Creator = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    mail: '',
    socialLink: '',
    niche: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.whatsapp && formData.mail && formData.socialLink && formData.niche) {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const response = await fetch('https://filestoresystem-deepti.onrender.com/stp/v1/creator_entry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            whatsapp_number: formData.whatsapp,
            email: formData.mail,
            platform_link: formData.socialLink,
            nich: formData.niche
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setIsSubmitted(true);
        } else {
          const errorsRaw = data.errors ?? data.error ?? data.message;
          const errMsg =
            typeof errorsRaw === 'string'
              ? errorsRaw
              : typeof errorsRaw === 'object' && errorsRaw !== null
              ? Object.values(errorsRaw).join(' | ')
              : 'Something went wrong. Please try again.';
          setErrorMessage(errMsg);
        }
      } catch (error) {
        setErrorMessage('Failed to connect to the server.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('claim-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-indigo-500/30 relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col gap-40 pt-32">

        {/* HERO */}
        <section className="flex flex-col items-center text-center gap-10 mt-12 md:mt-20">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Private Beta v1.0
          </div>

          <h1 className="text-5xl md:text-8xl font-medium tracking-tighter text-white max-w-5xl leading-[1.1]">
            Stop bartering.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-neutral-400">
              Start earning.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
            You don't need a million followers to have influence. Vibelist helps micro-creators turn local reach and loyal audiences into actual revenue. No more free shoutouts.
          </p>

          <div className="relative group inline-block mt-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 rounded-full blur-md opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <button
              onClick={scrollToForm}
              className="relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-neutral-950 px-10 font-medium text-neutral-200 border border-white/10 hover:border-indigo-500/50 transition-colors duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/5"></div>
              </div>
              <span className="relative z-10">Get Early Access</span>
            </button>
          </div>
        </section>

        <BackgroundAnimation />

        {/* MECHANICS - Asymmetric Grid */}
        <section className="flex flex-col gap-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white max-w-xl">
              Monetize on your terms, not the algorithm's.
            </h2>
            <p className="text-neutral-500 max-w-xs text-sm">
              Three distinct ways to generate income based on your unique audience profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Card */}
            <FadeIn className="md:col-span-8 flex">
              <div className="w-full p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between min-h-[320px]">
                <div className="w-12 h-12 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-8 font-mono text-sm">
                  01
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-4">Pay-Per-Click</h3>
                  <p className="text-neutral-400 leading-relaxed font-light max-w-md">
                    Share your unique magic link. Every time a real user clicks through to explore a brand, you get paid. Zero follower minimums, purely based on the traffic you drive.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Stacked Small Cards */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <FadeIn delay={200} className="flex-1 flex">
                <div className="w-full p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:bg-white/[0.04] transition-all duration-500">
                  <div className="text-xs font-mono text-neutral-500 mb-6">02 / Local</div>
                  <h3 className="text-xl font-medium text-white mb-2">Spot Promotions</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed font-light">
                    Visit neighborhood cafes and shops. Create authentic content and get paid directly by local businesses.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={400} className="flex-1 flex">
                <div className="w-full p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:bg-white/[0.04] transition-all duration-500">
                  <div className="text-xs font-mono text-neutral-500 mb-6">03 / Direct</div>
                  <h3 className="text-xl font-medium text-white mb-2">Brand Demands</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed font-light">
                    Match with rising startups looking for your exact niche. You set your price.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* COMPARISON / BENEFITS */}
        <section className="py-20 border-y border-white/5">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
              <div className="flex flex-col gap-8 pr-8 md:border-r border-white/5">
                <h3 className="text-xl font-medium text-neutral-500">The Old Way</h3>
                <ul className="flex flex-col gap-6">
                  <li className="text-neutral-400 font-light flex gap-4">
                    <span className="text-neutral-600">â€”</span> Pitching brands via DMs and getting ignored.
                  </li>
                  <li className="text-neutral-400 font-light flex gap-4">
                    <span className="text-neutral-600">â€”</span> Accepting free meals instead of actual money.
                  </li>
                  <li className="text-neutral-400 font-light flex gap-4">
                    <span className="text-neutral-600">â€”</span> Struggling and chasing brands just to get paid.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-8 md:pl-8">
                <h3 className="text-xl font-medium text-white">The Vibelist Way</h3>
                <ul className="flex flex-col gap-6">
                  <li className="text-neutral-200 font-light flex gap-4">
                    <span className="text-indigo-400">+</span> Automated matching with brands who want your audience.
                  </li>
                  <li className="text-neutral-200 font-light flex gap-4">
                    <span className="text-indigo-400">+</span> Transparent pricingâ€”you know exactly what you'll earn.
                  </li>
                  <li className="text-neutral-200 font-light flex gap-4">
                    <span className="text-indigo-400">+</span> Guaranteed, automated payouts the moment the job is done.
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* FORM SECTION */}
        <section id="claim-form" className="flex flex-col items-center justify-center pb-32">
          <div className="w-full max-w-lg">
            {!isSubmitted ? (
              <div className="flex flex-col gap-10">
                <div className="text-center">
                  <h3 className="text-3xl font-medium text-white mb-3 tracking-tight">Request Access</h3>
                  <p className="text-neutral-400 font-light">
                    We're onboarding creators in batches. Drop your details below.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all"
                    />
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="WhatsApp"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all"
                    />
                  </div>

                  <input
                    type="email"
                    name="mail"
                    required
                    value={formData.mail}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all"
                  />

                  <input
                    type="url"
                    name="socialLink"
                    required
                    value={formData.socialLink}
                    onChange={handleInputChange}
                    placeholder="Primary profile link (Instagram, YouTube, etc.)"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all"
                  />

                  <select
                    name="niche"
                    required
                    value={formData.niche}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-neutral-400 appearance-none focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all cursor-pointer [&>option]:bg-neutral-900"
                  >
                    <option value="" disabled>Select your primary niche</option>
                    <option value="Food & Cafes">Food & Dining</option>
                    <option value="Lifestyle & Fashion">Lifestyle & Fashion</option>
                    <option value="Education">Education</option>
                    <option value="Tech">Tech</option>
                    <option value="Dance & Music">Dance & Music</option>
                    <option value="Blogging">Blogging</option>
                    <option value="Travel & Entertainment">Travel & Entertainment</option>
                    <option value="Photography & Videography">Photography & Videography</option>
                    <option value="Other">Other</option>
                  </select>

                  <p className="text-xs text-neutral-500 mt-2 px-1">
                    By clicking "Join Waitlist", you acknowledge that you have read our <Link to="/privacy" className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-indigo-400/30 underline-offset-2">Privacy Policy</Link>.
                  </p>

                  {errorMessage && (
                    <p className="text-sm text-red-500 mt-2 text-center">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 w-full py-4 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition-colors duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      'Join Waitlist'
                    )}
                  </button>
                  <p className="text-center text-xs text-neutral-600 mt-2">
                    We appreciate your interest. As soon as we're ready, we'll notify you.
                  </p>
                </form>
              </div>
            ) : (
              <div className="relative animate-[fadeScale_0.5s_ease-out_forwards]">
                {/* Glow highlight behind the box */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30 rounded-[2.2rem] blur-xl animate-pulse"></div>

                <div className="relative flex flex-col items-center text-center py-16 px-8 border border-indigo-500/30 rounded-[2rem] bg-[#0a0a0f]/90 backdrop-blur-xl shadow-[0_0_60px_rgba(99,102,241,0.15)]">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Animated checkmark */}
                  <div className="w-16 h-16 rounded-full border-2 border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center mb-6 animate-bounce shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3">You're on the list.</h3>
                  <p className="text-neutral-400 font-light leading-relaxed max-w-sm">
                    We've secured your spot. Keep an eye on your Mail that you provided above, we'll notify you when we go live.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Creator;
