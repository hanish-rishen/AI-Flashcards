"use client";
import React, { useState, useEffect, useRef } from 'react';
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Button } from "@/components/ui/button";
import { generateFlashcards } from '@/lib/openrouter';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronLeft, IconChevronRight, IconChevronDown } from '@tabler/icons-react';
import { WavyBackground } from "@/components/ui/wavy-background";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Flashcard {
  question: string;
  answer: string;
}

export default function CreateFlashcardsPage() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState('/placeholder-avatar.png');
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        if (user.photoURL) {
          setProfilePicture(user.photoURL);
          setImageError(false);
        } else {
          setProfilePicture('/placeholder-avatar.png');
        }
      } else {
        router.push('/signup');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/signup');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleGenerateFlashcards = async () => {
    setIsLoading(true);
    setError('');
    try {
      const generatedFlashcards = await generateFlashcards(topic);
      setFlashcards(generatedFlashcards);
      setCurrentIndex(0);
    } catch (err) {
      console.error('Error in handleGenerateFlashcards:', err);
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const FlashcardStack = () => {
    const [flipped, setFlipped] = useState(false);

    const toggleFlip = () => {
      setFlipped(!flipped);
    };

    return (
      <div className="relative h-80 w-full max-w-md mx-auto">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            style={{ transformStyle: "preserve-3d" }}
            onClick={toggleFlip}
          >
            <motion.div
              className="absolute inset-0 w-full h-full bg-black/70 border-2 border-indigo-500 rounded-xl shadow-lg p-6 backface-hidden flex items-center justify-center"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-center text-white">{flashcards[currentIndex]?.question}</h3>
            </motion.div>
            <motion.div
              className="absolute inset-0 w-full h-full bg-black/70 border-2 border-indigo-500 rounded-xl shadow-lg p-6 backface-hidden flex items-center justify-center"
              initial={{ rotateY: 180 }}
              animate={{ rotateY: flipped ? 360 : 180 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-center text-white">{flashcards[currentIndex]?.answer}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col font-sans relative"
    >
      {user && (
        <div className="absolute top-4 right-4 z-50">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 bg-white/30 text-indigo-100 px-4 py-2 rounded-md hover:bg-white/40 transition-colors duration-200 shadow-md"
            >
              {!imageError ? (
                <Image
                  src={profilePicture}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                  onError={() => {
                    setImageError(true);
                    setProfilePicture('/placeholder-avatar.png');
                  }}
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <span>{user.email}</span>
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <IconChevronDown size={20} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                >
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
      <WavyBackground className="flex-grow flex items-center justify-center" colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}>
        <div className="container mx-auto p-4 flex flex-col items-center relative">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-100 mb-8 text-center">Create Flashcards</h1>
          <div className="w-full max-w-md mb-8">
            <PlaceholdersAndVanishInput
              placeholders={[
                "Enter a topic or subject to generate flashcards...",
                "Try 'World War II'...",
                "Or 'Photosynthesis'...",
                "Maybe 'JavaScript Basics'..."
              ]}
              onChange={(e) => setTopic(e.target.value)}
              onSubmit={(e) => {
                e.preventDefault();
                handleGenerateFlashcards();
              }}
            />
            {error && <p className="text-red-300 mt-2 text-center">{error}</p>}
          </div>
          {isLoading && (
            <div className="w-full max-w-md">
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            </div>
          )}
          {!isLoading && flashcards.length > 0 && (
            <div className="w-full max-w-md">
              <FlashcardStack />
              <div className="flex justify-between items-center mt-6">
                <Button onClick={handlePrevious} variant="outline" className="flex items-center bg-white/20 text-indigo-100 hover:bg-white/30">
                  <IconChevronLeft className="mr-2" /> Previous
                </Button>
                <p className="text-indigo-100 text-xl font-semibold">
                  {currentIndex + 1}/{flashcards.length}
                </p>
                <Button onClick={handleNext} variant="outline" className="flex items-center bg-white/20 text-indigo-100 hover:bg-white/30">
                  Next <IconChevronRight className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </WavyBackground>
    </motion.div>
  );
}