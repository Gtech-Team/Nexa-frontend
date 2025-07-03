/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion, AnimatePresence } from "framer-motion";

interface StepTransitionWrapperProps {
  children: React.ReactNode;
  transitionKey: number | string;
}

export const StepTransitionWrapper: React.FC<StepTransitionWrapperProps> = ({
  children,
  transitionKey,
}) => {
  const slideVariants = {
    hidden: { 
      opacity: 0,
      x: 50,
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1], // equivalent to "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.3,
      }
    },
  };

  return (
    <div className="w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={transitionKey}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StepTransitionWrapper;
