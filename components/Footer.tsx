import React, { useState } from 'react';
import { LogoIcon, MailIcon, ArrowRightIcon } from './Icons';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Unable to connect to subscription server.');
    }
  };

  return (
    <footer className="bg-[#050505] pt-0 pb-16 relative z-10">
      <div className="container mx-auto px-6 md:px-12">

        {/* Main CTA Card */}
        <div className="bg-[#080808] rounded-[3rem] p-10 md:p-14 lg:p-16 relative overflow-hidden border border-white/5 shadow-2xl">

          {/* Grid Pattern Background */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
            <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern-footer" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern-footer)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between min-h-[280px]">

            {/* Top Row: Logo & Decoration */}
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600/10 p-2 rounded-xl border border-blue-500/20">
                  <LogoIcon className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Forge Systems</span>
              </div>

              {/* Geometric Decoration (Top Right) */}
              <div className="hidden md:flex gap-1 opacity-60">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500/10"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-transparent border border-blue-500/20"></div>
                </div>
              </div>
            </div>

            {/* Middle Row: Heading & Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-tighter leading-[0.95] mb-2">
                  Let's talk and<br />
                  discuss with us!
                </h2>
              </div>

              <div className="flex flex-col gap-8 lg:pl-16">
                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-sm">
                  Thousands of businesses across London love what we do. We've helped entrepreneurs in all industries achieve amazing results.
                </p>

                {/* Email Input Form */}
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                  <div className="bg-white rounded-full p-1.5 pl-6 flex items-center justify-between w-full shadow-[0_10px_40px_rgba(255,255,255,0.05)] border border-white/10 group focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                    <div className="flex items-center gap-3 flex-grow">
                      <MailIcon className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your E-mail"
                        required
                        disabled={status === 'loading'}
                        className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 w-full font-medium text-sm disabled:opacity-50"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-11 h-11 bg-[#0F1115] hover:bg-black disabled:bg-gray-500 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      {status === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ArrowRightIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  {message && (
                    <div className={`mt-3 text-xs font-semibold pl-6 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {message}
                    </div>
                  )}
                </form>
              </div>

            </div>

          </div>
        </div>

        {/* Footer Bottom: Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <span className="text-xs md:text-sm text-gray-500 font-medium">
              © 2026 Forge Systems. All Rights Reserved.
            </span>
            <div className="flex items-center gap-4 text-[10px] md:text-xs text-gray-600 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="w-1 h-1 rounded-full bg-gray-800"></span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span className="w-1 h-1 rounded-full bg-gray-800"></span>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="group flex flex-col items-center gap-1">
              <span className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors font-medium">Instagram</span>
              <div className="h-0.5 w-0 group-hover:w-full bg-blue-500 transition-all duration-300 rounded-full"></div>
            </a>
            <a href="#" className="group flex flex-col items-center gap-1">
              <span className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors font-medium">Twitter</span>
              <div className="h-0.5 w-0 group-hover:w-full bg-blue-500 transition-all duration-300 rounded-full"></div>
            </a>
            <a href="#" className="group flex flex-col items-center gap-1">
              <span className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors font-medium">LinkedIn</span>
              <div className="h-0.5 w-0 group-hover:w-full bg-blue-500 transition-all duration-300 rounded-full"></div>
            </a>
            <a href="#" className="group flex flex-col items-center gap-1">
              <span className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors font-medium">Meta</span>
              <div className="h-0.5 w-0 group-hover:w-full bg-blue-500 transition-all duration-300 rounded-full"></div>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;