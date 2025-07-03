"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GradientBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
  children: React.ReactNode;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  primaryColor = "#05BBC8",
  secondaryColor = "#2C3333",
  children,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%, ${primaryColor}, ${secondaryColor} 60%)`,
        }}
      />
      
      {/* Top-right blob */}
      <div 
        className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: primaryColor }}
      />
      
      {/* Bottom-left blob */}
      <div 
        className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: primaryColor }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
