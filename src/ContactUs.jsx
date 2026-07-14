import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xpwjvrqj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-indigo-500/30 relative">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="sticky top-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
            Vibelist<span className="text-indigo-500">.in</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="text-sm font-medium text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6 min-h-[calc(100vh-200px)]">

        <div className="w-full max-w-lg">
          {!isSubmitted ? (
            <div className="flex flex-col gap-10">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-4">Let's Talk.</h1>
                <p className="text-neutral-400 font-light text-lg">
                  Have a question? Drop us a message below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all"
                />
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help?"
                  rows="5"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all resize-none"
                ></textarea>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full py-4 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition-colors duration-300 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
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
                <h3 className="text-2xl font-medium text-white mb-3">Message Received!</h3>
                <p className="text-neutral-400 font-light leading-relaxed max-w-sm">
                  Thanks for reaching out. Our team will get back to you at the email provided shortly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-10 px-6 z-20 relative bg-[#050505]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Vibelist.in. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-neutral-500 hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
