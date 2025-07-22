"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

const HEADING_VARIANTS = [
    "Sell on Nexa",
    "List on Nexa", 
    "Add business"
]

interface AnimatedSellButtonProps {
    className?: string
}

export default function AnimatedSellButton({ className = "" }: AnimatedSellButtonProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HEADING_VARIANTS.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    const handleClick = () => {
        console.log("Sell on Nexa button clicked - navigating to business-onboarding")
        try {
            router.push('/business-onboarding')
        } catch (error) {
            console.error("Navigation error:", error)
        }
    }

    return (
        <div className={`flex flex-col items-start ${className}`} style={{ alignItems: "flex-start" }}>
            {/* Animated text aligned left */}
            <div
            onClick={handleClick}
            className="relative overflow-hidden cursor-pointer border-[#05BBC8] text-[#05BBC8] transition-all duration-300 hover:shadow-lg hover:scale-105 text-left z-20"
            style={{ textAlign: "left" }}
            >
            <AnimatePresence mode="wait">
                <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                    duration: 0.3,
                    ease: "easeInOut"
                }}
                className="inline-block font-medium"
                >
                {HEADING_VARIANTS[currentIndex]}
                </motion.span>
            </AnimatePresence>
            </div>
        </div>
     
    )
}
