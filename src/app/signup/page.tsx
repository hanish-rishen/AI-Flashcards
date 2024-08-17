"use client";
import React from "react";
import { SignupFormDemo } from "../../components/SignupForm";
import { WavyBackground } from "../../components/ui/wavy-background";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <WavyBackground className="flex-grow flex items-center justify-center" colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}>
        <div className="w-full max-w-md">
          <SignupFormDemo />
        </div>
      </WavyBackground>
    </div>
  );
}
