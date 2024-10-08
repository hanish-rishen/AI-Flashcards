"use client";
import React from "react";
import { motion } from "framer-motion";
import { WavyBackground } from "../components/ui/wavy-background";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import Link from 'next/link';

export default function Home() {
  const words = [
    {
      text: "Adaptive learning for better studying.",
    },
    {
      text: "Master content with AI flashcards.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <WavyBackground className="flex-grow flex items-center justify-center" colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}>
        <HeroHighlight className="text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-5xl md:text-7xl font-extrabold text-indigo-100 mb-6 leading-tight"
          >
            AI Flashcards
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-2xl md:text-3xl text-indigo-50 mb-8 font-light flex flex-col md:flex-row items-center justify-center"
          >
            <span className="mb-2 md:mb-0 md:mr-2">Revolutionize your learning with</span>
            <Highlight>AI-powered flashcards!</Highlight>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-xl md:text-2xl text-indigo-200 w-full mb-8"
          >
            <TypewriterEffectSmooth words={words} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                Get Started
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                    transform: 'skewX(-20deg)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: 'linear',
                  }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </HeroHighlight>
      </WavyBackground>
    </div>
  );
}