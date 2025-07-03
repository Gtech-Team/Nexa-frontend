"use client";

import { motion } from "framer-motion";
import React from "react";

interface StepCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export const StepCard: React.FC<StepCardProps> = ({
  children,
  title,
  subtitle,
  icon,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.7,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="backdrop-blur-2xl bg-gradient-to-b from-black/20 to-black/70 rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-800 p-4 xs:p-5 sm:p-6 md:p-8 shadow-2xl overflow-hidden relative">
        {/* Glass reflections */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -inset-[200%] top-0 bg-white/5 h-[60%] rotate-[-35deg] blur-3xl transform-gpu" />
        </div>
        
        {/* Header */}
        <div className="mb-5 sm:mb-6 md:mb-8 relative z-10">
          {icon && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#05BBC8]/10 border border-[#05BBC8]/20 text-[#05BBC8] mb-3 sm:mb-4"
            >
              {icon}
            </motion.div>
          )}
          
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1, duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2"
          >
            {title}
          </motion.h2>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.3, duration: 0.5 }}
              className="text-sm sm:text-base text-gray-400"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        
        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
};

export default StepCard;
