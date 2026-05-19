import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import CaseStudies from './components/CaseStudies';
import Features from './components/Features';
import FAQ from './components/FAQ';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

function App() {
  return (
    <main className="antialiased bg-black min-h-screen text-white selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <CaseStudies />
      <Features />
      <FAQ />
      <PricingSection />
      <Footer />
    </main>
  );
}

export default App;