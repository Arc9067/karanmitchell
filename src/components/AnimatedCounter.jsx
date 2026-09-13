import React, { useState, useEffect, useRef } from "react";

export default function AnimatedCounter({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  // Extract numeric part from string like "500+", "99.4%", "$120M+"
  const isDecimal = target.includes(".");
  const numericVal = parseFloat(target.replace(/[^0-9.]/g, ""));
  const prefix = target.startsWith("$") ? "$" : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuad = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOutQuad * numericVal;
            
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [numericVal, duration]);

  const formatted = isDecimal ? count.toFixed(1) : Math.floor(count);
  const rawSuffix = target.replace(/[$0-9.]/g, "");

  return (
    <span ref={ref}>
      {prefix}{formatted}{rawSuffix || suffix}
    </span>
  );
}
