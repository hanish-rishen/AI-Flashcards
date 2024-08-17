"use client";
import React from "react";
import { SignupFormDemo } from "../../components/SignupForm";
import { WavyBackground } from "../../components/ui/wavy-background";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col font-sans"
    >
      <WavyBackground className="flex-grow flex items-center justify-center" colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}>
        <div className="w-full max-w-md px-4">
          <SignupFormDemo />
        </div>
      </WavyBackground>
    </motion.div>
  );
}