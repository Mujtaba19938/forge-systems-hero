import React from 'react';
import { DiamondIcon } from './Icons';
import { motion } from 'framer-motion';

const logos = [
  { name: 'Bomag', type: 'bold' },
  { name: 'Sprintray', type: 'diamond' },
  { name: 'Compaq', type: 'italic' },
  { name: 'Haier', type: 'black' },
  { name: 'Alesis', type: 'spaced' },
];

const LogoMarquee: React.FC = () => {
  // Duplicate the logos array to ensure a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="w-full bg-[#050505] border-y border-white/5 py-12 md:py-16 relative z-20 overflow-hidden">
      {/* Gradient Masks for smooth fade in/out on the edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden group">
        <motion.div
          className="flex items-center gap-12 md:gap-24 whitespace-nowrap"
          animate={{
            x: [0, -1000], // Adjust distance based on content width for loop smoothness
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30, // Slow and professional
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.name}-${index}`} 
              className="flex items-center gap-3 opacity-30 hover:opacity-80 transition-opacity duration-500 cursor-default"
            >
              {logo.type === 'diamond' && (
                <DiamondIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-300" />
              )}
              
              <span className={`
                text-2xl md:text-3xl text-gray-300 uppercase select-none
                ${logo.type === 'bold' ? 'font-black tracking-wider' : ''}
                ${logo.type === 'diamond' ? 'font-bold tracking-wide' : ''}
                ${logo.type === 'italic' ? 'font-bold italic tracking-wide transform -skew-x-6' : ''}
                ${logo.type === 'black' ? 'font-black tracking-widest' : ''}
                ${logo.type === 'spaced' ? 'font-bold tracking-[0.2em]' : ''}
              `}>
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoMarquee;