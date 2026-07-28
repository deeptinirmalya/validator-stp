import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-white/30 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      <Navbar />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col gap-24">

        <section className="flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-400 backdrop-blur-md">
            Our Story
          </div>
          <h1 className="text-4xl md:text-7xl font-medium tracking-tighter text-white leading-[1.1]">
            We Believed the Ad World Was Broken.{' '}
            <span className="text-white">
              So We Built a System to Fix It.
            </span>
          </h1>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            <span className="text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase">The Problem</span>
            <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent"></div>
          </div>

          <div className="flex flex-col gap-6 text-lg text-neutral-400 font-light leading-relaxed">
            <p>
              Every single day, millions of incredibly talented micro-creators produce amazing content. They have deeply loyal, engaged communities. Yet, traditional ad platforms tell them they are <span className="text-white font-medium">"too small"</span> to earn real money because they don't have 100,000 followers.
            </p>
            <p>
              At the exact same time, local shops, cafes, and rising startups are burning thousands of rupees on digital ads, only to get empty views, fake bot traffic, and zero actual sales.
            </p>
            <p className="text-neutral-300">
              We looked at this broken system and asked a simple question: <span className="text-white font-medium">Why are brands paying for empty views, and why are small creators working for free?</span>
            </p>
            <p className="text-white font-medium text-xl mt-2">
              That is why we built Vibelist.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-white/5 via-white/5 to-white/5 rounded-[2rem] blur-2xl"></div>
          <div className="relative p-10 md:p-14 rounded-[2rem] border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
            <div className="text-xs font-mono text-neutral-400 tracking-[0.2em] uppercase mb-6">Our Mission</div>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              To democratize digital marketing by turning real human recommendation into a legitimate, borderless economy.
            </p>
            <p className="text-neutral-400 font-light mt-4 text-lg">
              We believe your influence is measured by your impact, not your follower count.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            <span className="text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase">What We Do</span>
            <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent"></div>
          </div>

          <p className="text-lg text-neutral-400 font-light leading-relaxed text-center max-w-2xl mx-auto">
            Vibelist is a pure performance utility network. We completely cut out the hidden agency fees, the painful contract negotiations, and the gatekeeping.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-white/15 transition-all duration-500">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-300 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">For Creators</h3>
              <p className="text-neutral-400 font-light leading-relaxed">
                We give you instant access to your favorite neighborhood spots and online brands. No bidding wars—you grab a link, recommend what you love, and get paid directly via UPI based entirely on the real traffic or action you drive.
              </p>
            </div>

            <div className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-white/15 transition-all duration-500">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-300 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">For Businesses</h3>
              <p className="text-neutral-400 font-light leading-relaxed">
                We provide complete fraud protection. You stop buying empty clicks or inflated follower counts. With Vibelist, you only pay when real human beings actively land on your website or purchase your product.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            <span className="text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase">Our Values</span>
            <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent"></div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="group p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 hover:border-white/15 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Radically Transparent</h3>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    No hidden match-making fees. No black-box algorithms. Creators know exactly how much they earn per action, and brands see exactly where every single rupee goes down to the millisecond.
                  </p>
                </div>
              </div>
            </div>

            <div className="group p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 hover:border-white/15 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Built for the Underdog</h3>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    The internet shouldn't just reward celebrities. If you have 500 loyal followers who trust your taste in local cafes or tech tools, you are a valuable partner in our ecosystem. We treat you like one.
                  </p>
                </div>
              </div>
            </div>

            <div className="group p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 hover:border-white/15 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Performance Over Hype</h3>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    We don't sell vanity metrics. We don't care about generic impressions or superficial video views. We care about real traffic, valid conversions, and actual business growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center text-center gap-8 py-10">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white leading-tight">
            Ready to Change How{' '}
            <span className="text-white">
              the Internet Earns?
            </span>
          </h2>
          <p className="text-neutral-400 font-light text-lg max-w-xl">
            Whether you are a creator trying to turn your links into an active business, or a startup looking to get high-intent users to your product, we are building this infrastructure for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              to="/"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black hover:bg-neutral-200 transition-colors duration-300"
            >
              Explore Open Campaigns
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-14 items-center justify-center rounded-full bg-transparent px-8 font-medium text-neutral-300 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
