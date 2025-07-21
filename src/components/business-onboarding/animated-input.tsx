"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface AnimatedInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  autoFocus?: boolean;
  className?: string;
  delay?: number;
  icon?: React.ReactNode;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  disabled = false,
  error,
  autoFocus = false,
  className = "",
  delay = 0,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const hasValue = value && value.length > 0;
  const showError = error && error.length > 0;

  return (
    <motion.div 
      className={`mb-5 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative">
        <motion.label
          htmlFor={name}
          className={`absolute left-3 pointer-events-none transition-all duration-200 ${
            isFocused || hasValue
              ? 'text-xs -translate-y-[14px] text-[#05BBC8]'
              : 'text-sm translate-y-2 text-gray-400'
          }`}
          animate={{
            fontSize: isFocused || hasValue ? "0.75rem" : "0.875rem",
            transform: isFocused || hasValue ? "translateY(-14px)" : "translateY(10px)",
            color: isFocused ? "var(--color-primary)" : hasValue ? "white" : "rgb(156 163 175)",
          }}
          transition={{ duration: 0.15 }}
        >
          {label}
          {required && <span className="text-[#05BBC8] ml-1">*</span>}
        </motion.label>
        
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder={isFocused ? placeholder : ""}
          className={`h-14 px-3 pt-4 pb-2 bg-gray-900/50 backdrop-blur-md border-gray-800 
            focus:border-[#05BBC8] focus:ring-[#05BBC8]/20 
            ${showError ? "border-red-500" : ""} 
            placeholder:text-gray-500`}
        />
      </div>
      
      {showError && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-xs text-red-500 mt-1 pl-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default AnimatedInput;
