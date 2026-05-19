import React, { useState } from 'react';

const faqData = [
  {
    question: "How Does It Work?",
    answer: "Our process begins with a comprehensive audit of your current systems. We then identify key bottlenecks and implement our automated solutions to streamline your workflow and maximize efficiency without disrupting your daily operations."
  },
  {
    question: "What Platforms Do You Advertise On?",
    answer: "We Advertise On Facebook, Instagram, YouTube, Google, Tiktok And LinkedIn. Best Solutions For Your Business And We Create Ideas Is And Solution For Your Problem And Make Growth Solutions Offer A Range Of Services To Their Clients"
  },
  {
    question: "How Much Is The Commission?",
    answer: "Our commission structure is designed to be flexible and performance-based. We typically charge a small management fee plus a percentage of the revenue generated or ad spend managed, ensuring our incentives are perfectly aligned with your growth."
  },
  {
    question: "How Do We Start?",
    answer: "Starting is seamless. Simply book a discovery call through our website. We'll discuss your specific needs, map out a strategy, and can often begin implementation within 48-72 hours of our initial agreement."
  },
  {
    question: "What Will Be The Revisions System?",
    answer: "We believe in continuous improvement. Our strategy includes weekly performance reviews and unlimited refinements to ad creatives and targeting parameters to ensure we are constantly optimizing towards your KPIs."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#050505] py-24 pb-32 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-sm">
            <span className="text-xs font-semibold text-blue-400 tracking-wide">FAQs</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium text-white flex items-center gap-3 tracking-tight">
            <span className="text-blue-500 text-3xl md:text-5xl font-bold mb-1">›</span> 
            Frequently Asked Questions.
          </h2>
        </div>

        {/* Main Card Container */}
        <div className="bg-[#080808] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border-b border-white/5 last:border-0 ${index === 0 ? 'pb-6 md:pb-8' : 'py-6 md:py-8'}`}
                >
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between group text-left focus:outline-none"
                  >
                    <h3 className={`text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0 ml-4 relative w-6 h-6 flex items-center justify-center">
                       {/* Minus Icon (Visible when open) */}
                       <span className={`absolute transform transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                         <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="14" height="2" rx="1" fill="currentColor" className="text-blue-500"/>
                         </svg>
                       </span>
                       {/* Plus Icon (Visible when closed) */}
                       <span className={`absolute transform transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                         <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gray-500 group-hover:text-white transition-colors"/>
                         </svg>
                       </span>
                    </div>
                  </button>
                  
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed pr-8">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;