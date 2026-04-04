import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function StatCounter({ end, duration = 2000, suffix = '', prefix = '', decimals = 1 }: StatCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(end * easeOutQuart);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{count.toFixed(decimals)}{suffix}
    </motion.span>
  );
}

interface StatsDisplayProps {
  stats: Array<{
    label: string;
    value: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    description: string;
  }>;
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 shadow-lg"
        >
          <div className="text-4xl font-bold text-blue-600 mb-2">
            <StatCounter 
              end={stat.value} 
              suffix={stat.suffix} 
              prefix={stat.prefix}
              decimals={stat.decimals ?? 1}
            />
          </div>
          <div className="font-semibold text-slate-900 mb-1">{stat.label}</div>
          <div className="text-sm text-slate-600">{stat.description}</div>
        </motion.div>
      ))}
    </div>
  );
}
