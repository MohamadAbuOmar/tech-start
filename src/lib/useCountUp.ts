import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useCountUp = (end: number, duration: number = 2) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
  });

  useEffect(() => {
    let animationRef: number;
    let isMounted = true;
    
    if (inView && end > 0) {
      const startTime = Date.now();
      const startValue = 0;
      const endValue = end;
      
      const updateCount = () => {
        if (!isMounted) return;
        
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / (duration * 1000), 1);
        
        const currentValue = startValue + (endValue - startValue) * easeOutQuad(progress);
        const newCount = Math.floor(currentValue);
        setCount(newCount);
        
        if (progress < 1) {
          animationRef = requestAnimationFrame(updateCount);
        } else {
          setCount(endValue);
        }
      };
      
      updateCount();
    }
    
    return () => {
      isMounted = false;
      if (animationRef) {
        cancelAnimationFrame(animationRef);
      }
    };
  }, [inView, end, duration]);

  const easeOutQuad = (t: number): number => t * (2 - t);

  return { count, ref, inView };
};

