"use client";

import { motion } from "framer-motion";
import React from "react";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepTitles = [],
}) => {
  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto py-4 sm:py-6 md:py-8 px-1 sm:px-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Line */}
      <div className="relative w-full h-[3px] bg-gray-800 rounded mb-4">
        <motion.div
          className="absolute h-full rounded"
          style={{
            background: "linear-gradient(90deg, #05BBC8 0%, #05BBC8 100%)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between relative z-10">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          const isCurrentStep = stepNumber === currentStep;
          
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <motion.div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                  isActive
                    ? "bg-[#05BBC8] text-black"
                    : "bg-gray-800 text-gray-400"
                } ${
                  isCurrentStep ? "ring-2 ring-offset-2 ring-[#05BBC8] ring-offset-black" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && stepNumber !== currentStep ? (
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <span className="text-sm sm:text-base font-semibold">{stepNumber}</span>
                )}
              </motion.div>
              {stepTitles[index] && (
                <motion.span 
                  className={`text-[10px] sm:text-xs mt-1 sm:mt-2 hidden xs:block ${
                    isActive ? "text-[#05BBC8] font-medium" : "text-gray-500"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {stepTitles[index]}
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
