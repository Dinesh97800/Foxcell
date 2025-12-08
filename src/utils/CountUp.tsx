// components/CountUp.tsx
"use client";

import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number; // in ms
  suffix?: string;
}

export default function CountUp({ end, duration = 2000, suffix = "" }: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = 0;
          const increment = end / (duration / 16);

          const animate = () => {
            start += increment;
            if (start < end) {
              setValue(Math.floor(start));
              requestAnimationFrame(animate);
            } else {
              setValue(end);
            }
          };

          animate();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="text-xl md:text-2xl font-bold">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
