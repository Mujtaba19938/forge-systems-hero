import React, { useState } from 'react';
import { LogoIcon, LightningIcon, MenuIcon, XIcon } from './Icons';
import { NavLink } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks: NavLink[] = [
  { label: 'Features', href: '#' },
  { label: 'Platform', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Contact', href: '#' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <div className="relative backdrop-blur-xl bg-black/40 border border-white/10 rounded-full px-2 py-2 flex items-center justify-between shadow-lg shadow-black/20 z-50">

        {/* Left: Logo */}
        <div className="flex items-center gap-3 pl-4">
          <LogoIcon className="w-5 h-5 text-white" />
          <span className="font-medium text-white text-sm tracking-wide">Forge Systems</span>
        </div>

        {/* Center: Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-normal"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-2 pr-1">
          <div className="hidden sm:block">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-blue-400/30">
              <div className="bg-white rounded-full p-0.5">
                <LightningIcon className="w-3 h-3 text-blue-600" />
              </div>
              Get Started
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white transition-colors hover:bg-white/10"
          >
            {isOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden absolute top-full left-0 w-full mt-4 p-6 bg-neutral-950/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl z-40 overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-xl font-medium text-gray-300 hover:text-white transition-colors border-b border-white/5 pb-4 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <button className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-full text-lg font-semibold transition-all shadow-[0_4px_25px_rgba(37,99,235,0.4)]">
                  <LightningIcon className="w-5 h-5" />
                  Get Started
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;