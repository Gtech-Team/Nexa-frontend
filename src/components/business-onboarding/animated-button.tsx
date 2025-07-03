"use client";

import { motion } from "framer-motion";
import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isBack?: boolean;
  isForward?: boolean;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  icon,
  iconPosition = "left",
  isBack = false,
  isForward = false,
  className = "",
  size = "default",
  type = "button",
  fullWidth = false,
}) => {
  // Map our custom variants to shadcn variants
  const variantMap: Record<string, string> = {
    primary: "bg-[#05BBC8] hover:bg-[#04a6b1] text-black font-medium",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white",
    outline: "bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800",
  };

  const computedVariant = 
    variant === "primary" || variant === "secondary" || variant === "outline" 
      ? "default" 
      : variant;

  const computedClassName = `${variantMap[variant] || ""} ${fullWidth ? "w-full" : ""} ${className}`;

  // Auto-add arrows if isBack or isForward is true
  if (isBack) {
    icon = <ArrowLeft className="w-4 h-4" />;
    iconPosition = "left";
  } else if (isForward) {
    icon = <ArrowRight className="w-4 h-4" />;
    iconPosition = "right";
  }

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      className={fullWidth ? "w-full" : ""}
    >
      <ShadcnButton
        variant={computedVariant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"}
        onClick={onClick}
        disabled={disabled}
        className={computedClassName}
        size={size}
        type={type}
      >
        {icon && iconPosition === "left" && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="ml-2">{icon}</span>
        )}
      </ShadcnButton>
    </motion.div>
  );
};

export default AnimatedButton;
