import React, { useEffect, useRef, useState } from 'react';
import CountUp from './CountUp';

const CaseStudies: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#050505] py-24 relative z-10 border-t border-white/5 overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
            @keyframes drawPath {
                from { stroke-dashoffset: 1000; }
                to { stroke-dashoffset: 0; }
            }
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(-30px); }
                to { opacity: 1; transform: translateX(0); }
            }
            .animate-path {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: drawPath 2.5s ease-out forwards;
            }
            .animate-slide-in-chart {
                opacity: 0;
                animation: slideInRight 0.8s ease-out 1.5s forwards;
            }
        `}} />
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className={`flex flex-col items-center text-center mb-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <span className="text-xs font-medium text-gray-300 tracking-wide">Case Studies</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-tight max-w-4xl tracking-tight">
                Real Outcomes From Custom Digital Products
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-3xl mx-auto">
                See how we design and build high-performance websites, apps, and platforms that eliminate bottlenecks, automate workflows, and drive measurable revenue growth.
            </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            
            {/* Card 1 - Slides in from LEFT */}
            <div className={`group relative rounded-3xl overflow-hidden bg-[#080808] transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                {/* Inner Card Background Mask */}
                <div className="absolute inset-[1px] bg-[#080808] rounded-[23px] z-10" />

                {/* Content Container */}
                <div className="relative z-20 h-full flex flex-col rounded-[23px] overflow-hidden">
                    {/* Chart Area */}
                    <div className="h-[320px] w-full relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#080808] to-[#080808]">
                        
                        {/* Badge */}
                        <div className="absolute top-6 right-6 px-4 py-2 bg-[#0F1115]/90 border border-white/10 rounded-lg shadow-lg z-10 backdrop-blur-md">
                            <span className="text-sm font-medium text-gray-200">
                                Sales Increased by <CountUp end={41} suffix="%" duration={2000} delay={500} startWhenInView={isVisible} />
                            </span>
                        </div>

                        {/* Chart SVG */}
                        <div className="absolute inset-0 p-6 pt-20">
                             <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                                <defs>
                                    <linearGradient id="gradient-1" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="1" />
                                    </linearGradient>
                                    <pattern id="grid-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <circle cx="1" cy="1" r="1" fill="#222" />
                                    </pattern>
                                </defs>
                                
                                <rect width="100%" height="100%" fill="url(#grid-dots)" className="opacity-40"/>

                                <path 
                                    d="M0,160 C80,160 120,140 180,100 C240,60 300,90 340,40" 
                                    fill="none" 
                                    stroke="url(#gradient-1)" 
                                    strokeWidth="4" 
                                    strokeLinecap="round"
                                    className={isVisible ? "animate-path" : "opacity-0"}
                                    filter="drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))"
                                />

                                {/* Markers - slide in from left along with the line */}
                                <g className={isVisible ? "animate-slide-in-chart" : "opacity-0"}>
                                    <circle cx="280" cy="73" r="6" fill="#0a0a0a" stroke="#60a5fa" strokeWidth="3" />
                                    <circle cx="280" cy="73" r="12" fill="#60a5fa" fillOpacity="0.1" className="animate-pulse" />
                                </g>
                                
                                {/* Tooltip - slide in from left, removing vertical reveal */}
                                <foreignObject x="220" y="90" width="120" height="50" className={`overflow-visible pointer-events-none ${isVisible ? "animate-slide-in-chart" : "opacity-0"}`}>
                                    <div className="px-3 py-1.5 bg-[#0F1115] border border-blue-500/30 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.2)] text-center w-fit mx-auto">
                                        <span className="text-sm font-bold text-white tracking-wide">
                                            <CountUp end={20045} prefix="$" decimals={2} duration={2000} delay={1500} startWhenInView={isVisible} />
                                        </span>
                                    </div>
                                </foreignObject>
                            </svg>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="p-8 md:p-10 pt-4 bg-[#080808] flex-grow">
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            Contractor Case Study: Building an AI-Powered Bidding Platform
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            We developed a custom web platform that parses complex customer documents to instantly flag strategic work opportunities. By transforming a manual bottleneck into an automated digital app, their sales pipeline accelerated instantly.
                        </p>
                    </div>
                </div>
            </div>

            {/* Card 2 - Slides in from RIGHT */}
            <div className={`group relative rounded-3xl overflow-hidden bg-[#080808] transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                {/* Inner Card Background Mask */}
                <div className="absolute inset-[1px] bg-[#080808] rounded-[23px] z-10" />

                {/* Content Container */}
                <div className="relative z-20 h-full flex flex-col rounded-[23px] overflow-hidden">
                    <div className="h-[320px] w-full relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#080808] to-[#080808]">
                        
                        <div className="absolute top-6 right-6 px-4 py-2 bg-[#0F1115]/90 border border-white/10 rounded-lg shadow-lg z-10 backdrop-blur-md">
                            <span className="text-sm font-medium text-gray-200">
                                Revenue Increased by <CountUp end={35} suffix="%" duration={2000} delay={500} startWhenInView={isVisible} />
                            </span>
                        </div>

                        <div className="absolute inset-0 p-6 pt-20">
                             <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                                <defs>
                                    <linearGradient id="gradient-2" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="1" />
                                    </linearGradient>
                                </defs>
                                
                                <rect width="100%" height="100%" fill="url(#grid-dots)" className="opacity-40"/>

                                <path 
                                    d="M0,170 C60,170 100,160 140,130 C180,100 240,120 300,90 C320,75 330,70 340,70 C360,70 380,60 400,55" 
                                    fill="none" 
                                    stroke="url(#gradient-2)" 
                                    strokeWidth="4" 
                                    strokeLinecap="round"
                                    className={isVisible ? "animate-path" : "opacity-0"}
                                    filter="drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))"
                                />

                                 {/* Markers - slide in from left */}
                                 <g className={isVisible ? "animate-slide-in-chart" : "opacity-0"}>
                                    <circle cx="340" cy="70" r="6" fill="#0a0a0a" stroke="#60a5fa" strokeWidth="3" />
                                    <circle cx="340" cy="70" r="12" fill="#60a5fa" fillOpacity="0.1" className="animate-pulse" />
                                 </g>

                                {/* Tooltip - slide in from left */}
                                <foreignObject x="290" y="85" width="100" height="50" className={`overflow-visible pointer-events-none ${isVisible ? "animate-slide-in-chart" : "opacity-0"}`}>
                                    <div className="px-3 py-1.5 bg-[#0F1115] border border-blue-500/30 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.2)] text-center w-fit">
                                        <span className="text-sm font-bold text-white tracking-wide">
                                            <CountUp end={15000} prefix="$" duration={2000} delay={1500} startWhenInView={isVisible} />
                                        </span>
                                    </div>
                                </foreignObject>
                            </svg>
                        </div>
                    </div>

                    <div className="p-8 md:p-10 pt-4 bg-[#080808] flex-grow">
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            Marketing Agency Case Study: Custom Data & Research Web App
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            We engineered an intuitive, user-first internal web application that aggregates customer research and automates account sourcing. The outcome-driven platform gives their client-facing team instant pre-call insights, driving massive efficiency.
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudies;