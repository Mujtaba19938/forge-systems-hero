import React, { useEffect, useRef, useState } from 'react';

const featuresData = [
    {
        id: 1,
        title: "01. Contract Monitoring",
        description: "Continuous monitoring of contract performance ensures compliance and maximizes value realization throughout the lifecycle."
    },
    {
        id: 2,
        title: "02. Audience Segment",
        description: "Identify and target high-value segments with precision using our advanced AI-driven audience analysis tools."
    },
    {
        id: 3,
        title: "03. 5 Years Of Research",
        description: "Leveraging half a decade of proprietary market research to drive data-informed decision making for your business."
    }
];

const Features: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState(2);
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
    <section ref={sectionRef} className="bg-[#050505] py-32 relative z-10 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Stacked Cards */}
            <div className={`flex flex-col gap-6 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                
                {featuresData.map((feature) => {
                    const isActive = activeId === feature.id;
                    return (
                        <div 
                            key={feature.id}
                            onClick={() => setActiveId(feature.id)}
                            className={`
                                relative p-8 rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group
                                ${isActive 
                                    ? '-ml-0 lg:-ml-4 bg-[#080808] border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] z-10 scale-[1.02] lg:scale-100' 
                                    : 'ml-0 lg:ml-12 bg-[#080808] border-white/5 hover:border-white/10 z-0 opacity-80 hover:opacity-100'}
                            `}
                        >
                            {/* Blue Indicator Bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-l-2xl transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                            
                            <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-400'}`}>
                                {feature.title}
                            </h3>
                            <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? 'text-gray-400' : 'text-gray-600'}`}>
                                {feature.description}
                            </p>
                        </div>
                    );
                })}

            </div>

            {/* Right Column: Text & Icon */}
            <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                <h2 className="text-4xl md:text-5xl font-medium text-white mb-10 leading-tight tracking-tight">
                    We Are Building The<br />
                    Economic <span className="text-blue-500">Business</span><br />
                    For Every Size
                </h2>
                
                <div className="flex flex-col sm:flex-row items-start gap-8">
                    {/* Abstract Icon */}
                    <div className="flex-shrink-0">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Left Eye */}
                            <circle cx="25" cy="25" r="12" className="fill-blue-400/20" />
                            <circle cx="25" cy="25" r="6" className="fill-blue-400" />
                            
                            {/* Right Eye */}
                            <circle cx="55" cy="25" r="12" className="fill-blue-600/20" />
                            <circle cx="55" cy="25" r="6" className="fill-blue-600" />
                            
                            {/* Bowl/Mouth Shape */}
                            <path d="M10 45H70C70 61.5685 56.5685 75 40 75C23.4315 75 10 61.5685 10 45Z" className="fill-[#0F1525] stroke-blue-500/30" strokeWidth="2" />
                        </svg>
                    </div>
                    
                    <div className="max-w-md">
                        <p className="text-gray-400 text-lg leading-relaxed mb-4">
                             Our comprehensive suite of tools scales with your organization, 
                             providing enterprise-grade capabilities whether you're a startup 
                             or a global corporation.
                        </p>
                        <p className="text-gray-500 text-sm">
                            We transform complex data into actionable growth strategies designed for the modern economic landscape.
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Features;