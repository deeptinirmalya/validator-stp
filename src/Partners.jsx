import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from './config.js';

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
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
    >
      {children}
    </div>
  );
};

const Partners = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    whatsapp: '',
    socialLink: '',
    industry: '',
    operationType: '',
    businessLocation: '',
    goals: {
      driveWalkIns: false,
      appDownloads: false,
      sellTickets: false,
      brandAwareness: false,
      platformTraffic: false
    },
    revenue: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, goals: { ...prev.goals, [name]: checked } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          const addr = data.address;

          const city =
            addr.city ||
            addr.city_district ||
            addr.town ||
            addr.village ||
            addr.suburb ||
            addr.municipality ||
            addr.county ||
            '';

          const state = addr.state || '';
          const pincode = addr.postcode || '';

          const locationString = [city, state, pincode].filter(Boolean).join(', ');

          setFormData(prev => ({
            ...prev,
            businessLocation: locationString || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          }));
        } catch (err) {
          setFormData(prev => ({
            ...prev,
            businessLocation: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
          }));
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.error('❌ Geolocation error:', err.code, err.message);
        alert(`Unable to get your location (Error ${err.code}). Please allow location access and try again.`);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch(`${API_BASE}/stp/v1/partners_entry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setIsSubmitted(true);
      } else {
        const errorsRaw = result.errors ?? result.error ?? result.message;
        const errMsg =
          typeof errorsRaw === 'string'
            ? errorsRaw
            : typeof errorsRaw === 'object' && errorsRaw !== null
              ? Object.values(errorsRaw).join(' | ')
              : 'Something went wrong. Please try again.';
        setErrorMessage(errMsg);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Unable to reach the server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="sticky top-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 flex flex-col gap-32">

        {/* 1. Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex flex-col items-start gap-8 lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-400 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> For Brands & Businesses
            </div>
            <h1 className="text-5xl md:text-6xl font-medium tracking-tighter text-white leading-tight">
              Stop Chasing Vanity Metrics. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Bring Real People to Your Business.</span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-lg">
              Partner with micro-creators who turn local attention into immediate action—whether it’s a walk-in, a registration, or a ticket sale.
            </p>
            <a
              href="#partner-form"
              onClick={(e) => { e.preventDefault(); document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-medium overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Grow My Business Now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
          <div className="lg:w-1/2 w-full relative">
            {/* Visual Element Mockup */}
            <div className="relative aspect-square md:aspect-video lg:aspect-square w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur-3xl opacity-50"></div>
              <div className="relative w-full h-full border border-white/10 rounded-[2rem] bg-[#0a0a0f]/80 backdrop-blur-xl overflow-hidden flex shadow-2xl">
                {/* Left Side: App Map Mockup */}
                <div className="w-1/2 border-r border-white/5 p-6 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
                  <div className="absolute inset-0 bg-indigo-900/10"></div>
                  <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-indigo-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="absolute bottom-1/3 left-1/2 w-10 h-10 bg-indigo-400 rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  <div className="absolute bottom-6 left-6 right-6 h-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center px-4 gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20"></div>
                    <div className="h-2 w-16 bg-white/20 rounded-full"></div>
                  </div>
                </div>
                {/* Right Side: Venue Buzz */}
                <div className="w-1/2 bg-neutral-900 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                  {/* Abstract representation of a crowd */}
                  <div className="flex flex-wrap gap-2 p-4 opacity-40">
                    {[...Array(30)].map((_, i) => (
                      <div key={i} className={`rounded-full bg-white ${i % 3 === 0 ? 'w-4 h-4' : i % 2 === 0 ? 'w-3 h-3' : 'w-5 h-5'} opacity-${Math.random() > 0.5 ? '50' : '20'}`}></div>
                    ))}
                  </div>
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
                    <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-medium backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      +142 Walk-ins Today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Identity Matrix */}
        <section className="flex flex-col items-center gap-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white">Built for Growth Across Every Sector.</h2>
            <p className="text-neutral-400 mt-4 text-lg">No matter your business, we connect you with the creators who matter locally.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[
              { icon: '🍽️', title: 'Hospitality & Food', desc: 'Cafes, restaurants, lounges, and cloud kitchens looking to pack their tables.' },
              { icon: '🛍️', title: 'Retail & Boutiques', desc: 'Clothing stores, salons, and supermarkets wanting local street foot traffic.' },
              { icon: '🏢', title: 'Local Startups', desc: 'Co-working hubs, regional apps, and modern services driving local sign-ups.' },
              { icon: '🧘', title: 'Institutes & Wellness', desc: 'Gyms, coaching centers, and clinics building neighborhood trust.' },
              { icon: '🎟️', title: 'Events & Entertainment', desc: 'Gig organizers, flea markets, and shows selling out tickets fast.' }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed font-light">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 3. Problem vs Solution */}
        <section className="flex flex-col gap-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white">The Reality Check.</h2>
            <p className="text-neutral-400 mt-4 text-lg">Why traditional ads are failing local businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 items-center justify-center">
              <div className="bg-[#050505] p-2 text-neutral-500 font-medium text-sm">VS</div>
            </div>

            {/* The Old Way */}
            <FadeIn delay={100} className="w-full">
              <div className="p-8 md:p-12 rounded-[2rem] border border-red-500/10 bg-red-500/5 relative overflow-hidden group h-full">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity text-red-500">
                  <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-red-400 mb-8 flex items-center gap-3">
                  The Old Way
                  <span className="text-sm font-normal px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300">Meta / Google Ads</span>
                </h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="text-red-500 mt-1">✗</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Wasted Budget</h4>
                      <p className="text-neutral-400 text-sm">You pay for clicks from users 30km away or fake bot networks.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-red-500 mt-1">✗</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Complex Setups</h4>
                      <p className="text-neutral-400 text-sm">Requires ad managers, pixel setups, and constant financial optimization.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-red-500 mt-1">✗</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">High Banner Blindness</h4>
                      <p className="text-neutral-400 text-sm">People skip cold corporate ads without a second thought.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-red-500 mt-1">✗</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">No Foot Traffic</h4>
                      <p className="text-neutral-400 text-sm">Impressions online don't translate to bodies in your store.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </FadeIn>

            {/* The Vibelist Way */}
            <FadeIn delay={300} className="w-full">
              <div className="p-8 md:p-12 rounded-[2rem] border border-emerald-500/20 bg-[#0a0a0f]/80 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(16,185,129,0.05)] h-full hover:shadow-[0_0_50px_rgba(16,185,129,0.15)] transition-shadow duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                <h3 className="text-2xl font-medium text-emerald-400 mb-8 flex items-center gap-3 relative z-10">
                  The Vibelist Way
                  <span className="text-sm font-normal px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">New Economy</span>
                </h3>
                <ul className="space-y-6 relative z-10">
                  <li className="flex gap-4">
                    <div className="text-emerald-500 mt-1">✓</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Hyper-Local Targeting</h4>
                      <p className="text-neutral-400 text-sm">Your campaign targets the exact community living within a 5km radius of your venue.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-emerald-500 mt-1">✓</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Plug & Play</h4>
                      <p className="text-neutral-400 text-sm">Pick your niche, set your budget, and let local creators handle the production.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-emerald-500 mt-1">✓</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">High Trust Factor</h4>
                      <p className="text-neutral-400 text-sm">People visit venues recommended by peers and creators they actually know.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 4. How It Works */}
        <section className="flex flex-col gap-16 relative">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white">The 3-Step Process.</h2>
            <p className="text-neutral-400 mt-4 text-lg">Incredibly simple to launch a campaign.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {[
              { step: '1', title: 'Define Your Goal', desc: 'Drop your location pin, select your industry, and set your campaign budget.' },
              { step: '2', title: 'Connect with Creators', desc: 'Local micro-creators accept your campaign, walk into your venue, and shoot authentic native video content.' },
              { step: '3', title: 'Track Real Foot Traffic', desc: 'Monitor link clicks, coupon code redemptions, and foot traffic surge through your Vibelist dashboard.' }
            ].map((item, i) => (
              <FadeIn delay={i * 200} key={i} className="flex flex-col items-center text-center gap-6 relative z-10">
                <div className="w-24 h-24 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-3xl font-medium text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-indigo-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 5. Risk Mitigation */}
        <section className="relative p-10 md:p-16 rounded-[2.5rem] border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="absolute -right-32 -top-32 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/3">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-3xl font-medium text-white mb-4">Secure, Fraud-Free Marketing.</h2>
              <p className="text-neutral-400">Will creators take my money and fake the traffic? Never. We built a system to guarantee every view and click is legitimate.</p>
            </div>
            <div className="md:w-2/3 flex flex-col gap-6 w-full">
              {[
                { title: 'Escrow Security', desc: 'Your campaign funds are securely held and only paid out when authentic human conversions are verified.' },
                { title: 'Anti-Fraud Firewall', desc: 'Our system uses device fingerprinting, velocity checks, and network analysis to automatically block VPN masking, automated bots, and click farms.' },
                { title: 'Verified ROI', desc: 'Every rupee spent tracks back to verified local human redirects.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-6 rounded-2xl bg-[#0a0a0f]/80 border border-white/5 backdrop-blur-md">
                  <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{item.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Value Metric */}
        <section className="flex flex-col items-center text-center gap-8 mb-10">
          <div className="p-[1px] rounded-[2rem] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent w-full max-w-4xl mx-auto">
            <div className="px-8 py-16 rounded-[2rem] bg-[#050505] flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400 max-w-3xl leading-tight">
                Save up to 60% compared to traditional ad agency retainer fees and bloated platform ad spends.
              </h2>
              <p className="text-neutral-400 max-w-2xl text-lg">
                You don't need to pay hundreds of thousands to macro-influencers. Scale effectively by deploying a fleet of highly trusted local micro-creators simultaneously.
              </p>
              <a href="#partner-form" onClick={(e) => {
                e.preventDefault();
                document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' });
              }} className="mt-6 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full font-medium transition-colors cursor-pointer">
                Start Your First Campaign
              </a>
            </div>
          </div>
        </section>

        {/* 7. Partner Registration Form */}
        <section id="partner-form" className="w-full max-w-4xl mx-auto flex flex-col gap-8 mb-20 bg-[#0a0a0f]/80 p-8 md:p-12 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-2xl relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white">Join the Waitlist.</h2>
            <p className="text-neutral-400 mt-2">Fill out the form below to get early access to Vibelist creators.</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {/* Section 1: The Basics */}
              <div className="flex flex-col gap-6 border-b border-white/5 pb-10">


                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-400 font-medium">Business / Brand Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="businessLocation"
                      value={formData.businessLocation}
                      onChange={handleChange}
                      placeholder="e.g., city, state, pincode"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      title="Auto-detect my location"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-500/20 transition-all disabled:opacity-40"
                    >
                      {isLocating ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-400 font-medium">Company/Brand Name</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g., The Bean Cafe or FitFlow Gym" className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-400 font-medium">Contact Person Name & Role</label>
                  <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="e.g., Amit Sharma, Founder" className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-neutral-400 font-medium">Work Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="hello@brand.com" className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-neutral-400 font-medium">WhatsApp / Contact Number</label>
                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="9800000000" className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Section 2: Verification */}
              <div className="flex flex-col gap-6 border-b border-white/5 pb-10">


                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-400 font-medium">Website or Active Social Media Link</label>
                  <input type="url" name="socialLink" value={formData.socialLink} onChange={handleChange} placeholder="Website / Instagram / LinkedIn Profile URL" className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-400 font-medium">Primary Industry/Sector</label>
                  <select name="industry" value={formData.industry} onChange={handleChange} className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none" required>
                    <option value="" disabled>Select your industry</option>
                    <option value="Hospitality & Food">Hospitality & Food (Cafes, Restaurants, Lounges)</option>
                    <option value="Retail & Boutiques">Retail & Boutiques (Clothing, Salons, Marts)</option>
                    <option value="Local Startups">Local Startups & Digital Spaces (Apps, Co-working)</option>
                    <option value="Wellness & Gyms">Institutes, Wellness & Gyms (Coaching, Fitness)</option>
                    <option value="Events & Entertainment">Events, Entertainment & Gigs (Shows, Fleas)</option>
                  </select>
                </div>
              </div>

              {/* Section 3: Operational Model */}
              <div className="flex flex-col gap-6 border-b border-white/5 pb-10">


                <div className="flex flex-col gap-4">
                  <label className="text-sm text-neutral-400 font-medium">Operation Type</label>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input type="radio" name="operationType" value="Physical" checked={formData.operationType === 'Physical'} onChange={handleChange} className="w-4 h-4 text-indigo-500 bg-[#050505] border-white/20 focus:ring-indigo-500 focus:ring-offset-[#050505]" required />
                      <span className="text-sm">Physical Venue / Storefront (They have a physical address)</span>
                    </label>
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input type="radio" name="operationType" value="Digital" checked={formData.operationType === 'Digital'} onChange={handleChange} className="w-4 h-4 text-indigo-500 bg-[#050505] border-white/20 focus:ring-indigo-500 focus:ring-offset-[#050505]" />
                      <span className="text-sm">Purely Digital / Regional (App downloads, site sign-ups)</span>
                    </label>
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input type="radio" name="operationType" value="Hybrid" checked={formData.operationType === 'Hybrid'} onChange={handleChange} className="w-4 h-4 text-indigo-500 bg-[#050505] border-white/20 focus:ring-indigo-500 focus:ring-offset-[#050505]" />
                      <span className="text-sm">Hybrid (Both physical presence and online platform)</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Section 4: Budget & Goal */}
              <div className="flex flex-col gap-6 pb-4">


                <div className="flex flex-col gap-4">
                  <label className="text-sm text-neutral-400 font-medium">What is your primary goal?</label>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input type="checkbox" name="driveWalkIns" checked={formData.goals.driveWalkIns} onChange={handleChange} className="w-4 h-4 rounded text-indigo-500 bg-[#050505] border-white/20 focus:ring-indigo-500 focus:ring-offset-[#050505]" />
                      <span className="text-sm">Drive more physical walk-ins & customers</span>
                    </label>
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input type="checkbox" name="appDownloads" checked={formData.goals.appDownloads} onChange={handleChange} className="w-4 h-4 rounded text-indigo-500 bg-[#050505] border-white/20 focus:ring-indigo-500 focus:ring-offset-[#050505]" />
                      <span className="text-sm">Get local app downloads / digital sign-ups</span>
                    </label>
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input type="checkbox" name="sellTickets" checked={formData.goals.sellTickets} onChange={handleChange} className="w-4 h-4 rounded text-indigo-500 bg-[#050505] border-white/20 focus:ring-indigo-500 focus:ring-offset-[#050505]" />
                      <span className="text-sm">Sell event tickets / bookings</span>
                    </label>
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input type="checkbox" name="brandAwareness" checked={formData.goals.brandAwareness} onChange={handleChange} className="w-4 h-4 rounded text-indigo-500 bg-[#050505] border-white/20 focus:ring-indigo-500 focus:ring-offset-[#050505]" />
                      <span className="text-sm">Build overall local brand awareness</span>
                    </label>
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input type="checkbox" name="platformTraffic" checked={formData.goals.platformTraffic} onChange={handleChange} className="w-4 h-4 rounded text-indigo-500 bg-[#050505] border-white/20 focus:ring-indigo-500 focus:ring-offset-[#050505]" />
                      <span className="text-sm">Bring traffic to my platform / website</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-400 font-medium">Estimated Monthly Business Revenue</label>
                  <select name="revenue" value={formData.revenue} onChange={handleChange} className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none" required>
                    <option value="" disabled>Select a revenue range</option>
                    <option value="0-5000">Under ₹5,000 / month</option>
                    <option value="5001-10000">₹5,001 – ₹10,000 / month</option>
                    <option value="10001-30000">₹10,001 – ₹30,000 / month</option>
                    <option value="30001-50000">₹30,001 – ₹50,000 / month</option>
                    <option value="50001-100000">₹50,001 – ₹1,00,000 / month</option>
                    <option value="100001+">Above ₹1,00,000 / month</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-neutral-500 px-1">
                By clicking "Join Waitlist", you acknowledge that you have read our <Link to="/privacy" className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-indigo-400/30 underline-offset-2">Privacy Policy</Link>.
              </p>

              {errorMessage && (
                <p className="text-sm text-red-500 text-center mt-2">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-neutral-200 transition-colors duration-300 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : 'Join Waitlist'}
              </button>
            </form>
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
                  We've secured your spot. Keep an eye on your email - we'll reach out as soon as we're ready to launch.
                </p>
              </div>
            </div>
          )}
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-10 px-6 z-20 relative bg-[#050505]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Vibelist.in. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-neutral-500 hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Partners;
