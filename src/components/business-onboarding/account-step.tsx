"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedInput } from "@/components/business-onboarding/animated-input";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, MapPin, AlertCircle } from "lucide-react";

interface AccountStepProps {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  isExistingUser: boolean;
  onFieldChange: (field: string, value: string) => void;
  onToggleExistingUser: () => void;
  errors: Record<string, string>;
}

export const AccountStep: React.FC<AccountStepProps> = ({
  fullName,
  email,
  phone,
  password,
  city,
  isExistingUser,
  onFieldChange,
  onToggleExistingUser,
  errors,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Validate confirm password whenever password or confirmPassword changes
  useEffect(() => {
    if (!isExistingUser && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword, isExistingUser]);

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-3"
        >
          {isExistingUser ? "Welcome back!" : "Create your account"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 max-w-md mx-auto"
        >
          {isExistingUser
            ? "Login to continue with your business onboarding"
            : "Your account will be connected to your business"}
        </motion.p>
      </div>

      <div className="space-y-4">
        {!isExistingUser && (
          <AnimatedInput
            name="fullName"
            icon={<User size={20} />}
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => onFieldChange("fullName", e.target.value)}
            error={errors.fullName}
            delay={0.2}
            required
          />
        )}

        <AnimatedInput
          name="email"
          icon={<Mail size={20} />}
          label="Email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => onFieldChange("email", e.target.value)}
          error={errors.email}
          delay={0.3}
          required
        />

        {!isExistingUser && (
          <AnimatedInput
            name="phone"
            icon={<Phone size={20} />}
            label="Phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            error={errors.phone}
            delay={0.4}
            required
          />
        )}

        <AnimatedInput
          name="password"
          icon={<Lock size={20} />}
          label="Password"
          type="password"
          placeholder={isExistingUser ? "Enter your password" : "Create a password"}
          value={password}
          onChange={(e) => onFieldChange("password", e.target.value)}
          error={errors.password}
          delay={0.5}
          required
        />

        {!isExistingUser && (
          <>
            <AnimatedInput
              name="confirmPassword"
              icon={<Lock size={20} />}
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              error={confirmPasswordError}
              delay={0.6}
              required
            />

            <AnimatedInput
              name="city"
              icon={<MapPin size={20} />}
              label="City"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => onFieldChange("city", e.target.value)}
              error={errors.city}
              delay={0.7}
            />
          </>
        )}

        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 text-red-200 border border-red-500/30"
          >
            <AlertCircle size={18} />
            <span>{errors.general}</span>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center justify-center mt-6 pt-4 border-t border-gray-800"
      >
        <Button
          type="button"
          variant="link"
          className="text-[#05BBC8] hover:text-[#05BBC8]/80"
          onClick={onToggleExistingUser}
        >
          {isExistingUser
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </motion.div>
    </div>
  );
};
