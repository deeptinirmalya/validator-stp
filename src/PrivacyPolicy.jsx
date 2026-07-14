import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
            <Link to="/contact" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-4">Privacy Policy for Vibelist.in</h1>
          <p className="text-neutral-400">Last Updated: July 12, 2026</p>
        </div>

        <div className="prose prose-invert prose-neutral max-w-none prose-p:leading-relaxed prose-p:text-neutral-300 prose-headings:text-white prose-headings:font-medium prose-a:text-indigo-400 hover:prose-a:text-indigo-300">
          <p>
            Welcome to Vibelist.in. We strive to protect your personal data and respect your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our landing page and sign up for our VIP Creator Waitlist.
          </p>

          <h2 className="text-2xl mt-12 mb-4">1. Information We Collect</h2>
          <p>When you voluntarily fill out the forms on our landing page, we collect the following personal information:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-300">
            <li><strong>Identity Data:</strong> Your full name.</li>
            <li><strong>Contact Data:</strong> Your email address and your WhatsApp mobile number.</li>
            <li><strong>Professional Data:</strong> Your primary social media profile link (e.g., Instagram, YouTube) and your chosen content niche.</li>
          </ul>

          <p>If you register as a <strong>Business / Brand Partner</strong>, we additionally collect:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-300">
            <li><strong>Business Identity Data:</strong> Your business or brand name and your business social media or website link.</li>
            <li><strong>Business Profile Data:</strong> Your industry or sector, and your type of business operation (e.g., online, offline, or hybrid).</li>
            <li><strong>Location Data:</strong> Your business or brand location (city, state, and pincode), which may be captured via your device's GPS with your explicit permission.</li>
            <li><strong>Campaign Preference Data:</strong> Your marketing goals (e.g., drive walk-ins, app downloads, sell event tickets, or build brand awareness).</li>
            <li><strong>Financial Data:</strong> An estimated range of your monthly business revenue, used solely to match you with appropriate creator tiers.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-4">2. How We Use Your Data</h2>
          <p>We use the information we collect strictly for the following purposes:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-300">
            <li>To validate your interest and review your profile for early access selection.</li>
            <li>To communicate with you regarding your application status, platform launch updates, and exclusive VIP invitations.</li>
            <li>To prevent duplicate entries and spam on our waitlist.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-4">3. Third-Party Services We Use</h2>
          <p>We do not build all infrastructure from scratch. To communicate with you reliably, we securely share your contact details with trusted third-party service providers:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-300">
            <li><strong>Email Communication</strong> (e.g., Resend or other bulk email providers): We share your name and email address to send you transactional updates and onboarding materials.</li>
            <li><strong>WhatsApp Communication:</strong> We use automated messaging gateways to text your exclusive invite and verification codes straight to your phone.</li>
          </ul>

          <div className="p-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5 my-8">
            <p className="m-0 text-indigo-200">
              <span className="font-semibold text-indigo-400">🔒 Our Strict Guarantee:</span> These third-party platforms are strictly bound by data processing agreements. They are only authorized to use your data to send messages on our behalf and are legally forbidden from using it for their own marketing.
            </p>
          </div>

          <h2 className="text-2xl mt-12 mb-4">4. We Do Not Sell Your Data</h2>
          <p>
            Your privacy is not a commodity. We do not sell, rent, trade, or lease your personal information to any third-party companies, data brokers, or advertisers. Period. Your data is used exclusively to build the Vibelist ecosystem.
          </p>

          <h2 className="text-2xl mt-12 mb-4">5. Data Security and Retention</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-300">
            <li><strong>Security:</strong> We implement standard security measures to protect your submitted data from unauthorized access, loss, or alteration.</li>
            <li><strong>Retention:</strong> We will keep your information on file for as long as necessary to manage the launch waitlist. If you choose not to join the active platform once it goes live, your data will be securely archived or deleted.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-4">6. Your Rights (Data Control & Deletion)</h2>
          <p>You have total control over the data you give us. At any point, you have the right to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-300">
            <li>Ask us what data we hold about you.</li>
            <li>Request that we correct any incorrect details (like a typo in your WhatsApp number).</li>
            <li>Request the immediate and permanent deletion of your data from our servers and third-party tools.</li>
          </ul>
          <p>
            To exercise any of these rights, simply reach out to us via our <Link to="/contact" className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-400/30 underline-offset-2 transition-colors cursor-pointer">Contact Us</Link> page. We will process your deletion request within 30 days.
          </p>

          <h2 className="text-2xl mt-12 mb-4">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy as our platform evolves. If we make any significant changes to how we handle your data, we will notify you by updating the date at the top of this page or sending you an email notification.
          </p>

          <h2 className="text-2xl mt-12 mb-4">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please reach out to us via our <Link to="/contact" className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-400/30 underline-offset-2 transition-colors cursor-pointer">Contact Us</Link> page.
          </p>
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

export default PrivacyPolicy;
