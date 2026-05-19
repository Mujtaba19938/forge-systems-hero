import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
  startWhenInView?: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration = 2000, 
  delay = 0,
  prefix = '', 
  suffix = '', 
  decimals = 0,
  separator = ',',
  className = '',
  startWhenInView = true
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const runAnimation = () => {
        setTimeout(() => {
            let startTime: number | null = null;
            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = timestamp - startTime;
              const percentage = Math.min(progress / duration, 1);
              
              // Ease out quart
              const ease = 1 - Math.pow(1 - percentage, 4);
              
              setCount(end * ease);

              if (progress < duration) {
                requestAnimationFrame(animate);
              } else {
                setCount(end);
              }
            };
            requestAnimationFrame(animate);
          }, delay);
    };

    if (!startWhenInView) {
        runAnimation();
        return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          runAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, delay, startWhenInView]);

  const formatNumber = (num: number) => {
      const fixed = num.toFixed(decimals);
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return parts.join('.');
  };

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default CountUp;