"use client";
import React from "react";
import { SignupFormDemo } from "../../components/SignupForm";
import { WavyBackground } from "../../components/ui/wavy-background";
import { motion } from "framer-motion";
import Head from 'next/head';

export default function SignupPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen w-full flex items-center justify-center font-sans overflow-hidden"
      >
        <WavyBackground className="absolute inset-0" colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <SignupFormDemo />
          </div>
        </WavyBackground>
      </motion.div>
    </>
  );
}