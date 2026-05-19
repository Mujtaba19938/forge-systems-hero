import React, { useEffect, useRef } from 'react';

const HeroBackground: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const win = window as any;

    const initStudio = () => {
      if (win.UnicornStudio && typeof win.UnicornStudio.init === 'function') {
        try {
          // Calling init directly ensures the data-us-project div is detected
          win.UnicornStudio.init();
          win.UnicornStudio.isInitialized = true;
          initialized.current = true;
        } catch (e) {
          console.error("Unicorn Studio Init Error:", e);
        }
      }
    };

    if (!win.UnicornStudio || !win.UnicornStudio.isInitialized) {
      // Setup the global object if not present
      if (!win.UnicornStudio) {
        win.UnicornStudio = { isInitialized: false };
      }

      const scriptId = 'unicorn-studio-lib';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
        script.onload = () => {
          // Small delay to allow the UMD wrapper to finish populating the global object
          setTimeout(initStudio, 50);
        };
        document.head.appendChild(script);
      } else {
        initStudio();
      }
    }

    return () => {
      // Optional: Logic to clean up WebGL context if the library supports it
    };
  }, []);

  return (
    <div className="aura-background-component absolute inset-0 w-full h-full z-0">
      <div data-us-project="TIWE0oFfvUmetsFoxL6u" className="absolute inset-0 w-full h-full"></div>
    </div>
  );
};

export default HeroBackground;