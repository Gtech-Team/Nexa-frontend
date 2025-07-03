"use client";

import { motion } from "framer-motion";
import React from "react";
import { LucideIcon } from "lucide-react";

interface BusinessTypeOption {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface BusinessTypeSelectorProps {
  options: BusinessTypeOption[];
  selectedType: string;
  onSelect: (type: string) => void;
}

export const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  options,
  selectedType,
  onSelect,
}) => {
  // Animation variants for cards
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeInOut", // use a valid string for ease
      },
    }),
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
      {options.map((option, index) => {
        const isSelected = selectedType === option.id;
        
        return (
          <motion.div
            key={option.id}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(option.id)}
            className={`relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-300
              ${isSelected ? 'ring-2 ring-[#05BBC8]' : 'ring-1 ring-gray-800'}
              backdrop-blur-lg bg-gradient-to-b from-black/40 to-black/80`}
          >
            {/* Glass reflection effect */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div 
                className="absolute -inset-[200%] top-0 bg-white/5 h-[60%] rotate-[-35deg] blur-3xl transform-gpu" 
              />
            </div>
            
            {/* Hover glow effect */}
            <div
              className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
                isSelected ? 'opacity-20' : 'group-hover:opacity-10'
              } rounded-2xl`}
              style={{ backgroundColor: option.color.replace('bg-', '') }}
            />
            
            <div className="relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 h-full flex flex-col items-center justify-center">
              {/* Icon */}
              <div
                className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4 transition-all ${
                  isSelected ? 'scale-110' : ''
                }`}
                style={{ backgroundColor: option.color.replace('bg-', '') }}
              >
                <option.icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
              </div>
              
              {/* Name */}
              <h3 className={`text-xs xs:text-sm sm:text-base md:text-xl font-medium text-center mb-1 sm:mb-2 transition-colors ${
                isSelected ? 'text-white' : 'text-gray-200'
              }`}>
                {option.name}
              </h3>
              
              {/* Selected indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isSelected ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="mt-1 xs:mt-2 sm:mt-3 bg-[#05BBC8] text-black text-[8px] xs:text-[10px] sm:text-xs font-medium py-0.5 xs:py-1 px-1.5 xs:px-2 sm:px-3 rounded-full"
              >
                Selected
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BusinessTypeSelector;
