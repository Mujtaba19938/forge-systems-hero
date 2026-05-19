import React from 'react';
import HeroBackground from './HeroBackground';
import { UserIcon } from './Icons';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background is the FIRST child, absolute inset-0, -z-10 */}
      <HeroBackground />

      {/* Main Content Container - ensuring pointer-events are active for buttons */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col justify-center">

        {/* Layout remains identical to your existing structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end w-full max-w-7xl mx-auto mt-20">

          {/* Left Column: Big Heading */}
          <div className="lg:col-span-7">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.1] tracking-tight text-white drop-shadow-sm">
              We build websites,<br />
              apps,<br />
              and platforms user-<br />
              first, <br />
              outcome-driven.
            </h1>
          </div>

          {/* Right Column: Description & Actions */}
          <div className="lg:col-span-5 flex flex-col gap-8 pb-4">
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-lg">
              From launch to scale, we bring experience-led strategy, lean tech, and just the right structure to get it live.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {/* Primary Action */}
              <button className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.4)]">
                <div className="bg-white rounded-full p-0.5 text-blue-600">
                  <UserIcon className="w-4 h-4" />
                </div>
                <span>Book a Discovery Call</span>
              </button>

              {/* Secondary Action */}
              <button className="px-6 py-3.5 rounded-full text-sm font-medium text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm">
                See Our Impact
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Hero;