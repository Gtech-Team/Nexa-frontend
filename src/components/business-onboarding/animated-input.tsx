"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [showPassword, setShowPassword] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const hasValue = value && value.length > 0;
  const showError = error && error.length > 0;
  const isPasswordField = type === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <motion.div 
      className={`mb-5 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative pt-5">
        <motion.label
          htmlFor={name}
          className={`absolute left-3 pointer-events-none transition-all duration-200 z-10 ${
            isFocused || hasValue
              ? 'text-xs top-0 text-[#05BBC8] font-medium'
              : 'text-sm top-5 text-gray-400'
          }`}
          animate={{
            fontSize: isFocused || hasValue ? "0.75rem" : "0.875rem",
            transform: isFocused || hasValue ? "translateY(0px)" : "translateY(8px)",
            color: isFocused ? "#05BBC8" : hasValue ? "#05BBC8" : "rgb(156 163 175)",
          }}
          transition={{ duration: 0.15 }}
        >
          {label}
          {required && <span className="text-[#05BBC8] ml-1">*</span>}
        </motion.label>
        
        <Input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder={isFocused ? placeholder : ""}
          className={`h-12 px-3 pt-6 pb-2 bg-gray-800/90 backdrop-blur-sm border-gray-600 text-white 
            focus:border-[#05BBC8] focus:ring-2 focus:ring-[#05BBC8]/20 focus:bg-gray-800
            hover:bg-gray-800 hover:border-gray-500 transition-all duration-200
            ${showError ? "border-red-500 focus:border-red-500" : ""} 
            ${isPasswordField ? "pr-12" : ""}
            placeholder:text-gray-400`}
        />
        
        {isPasswordField && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-6 h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-transparent z-20"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}
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
