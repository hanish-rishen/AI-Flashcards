"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { IconBrandGoogle, IconRocket } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'next/navigation';

export function SignupFormDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully");
      }
      router.push('/create-flashcards');
    } catch (error) {
      setError(isSignUp ? 'Failed to create an account. Please try again.' : 'Failed to sign in. Please try again.');
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google successfully");
      router.push('/create-flashcards');
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black bg-opacity-80 border border-white backdrop-blur-sm"
    >
      <motion.div
        key={isSignUp ? 'signup' : 'signin'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-bold text-xl text-white">
          {isSignUp ? "Welcome to AI Flashcards" : "Welcome Back"}
        </h2>
        <p className="text-neutral-300 text-sm max-w-sm mt-2">
          {isSignUp ? "Sign up to start your personalized learning journey" : "Sign in to continue your exciting learning journey now."}
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-white">Email Address</Label>
            <AnimatedInput id="email" placeholder="johndoe@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className="text-white">Password</Label>
            <AnimatedInput id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </LabelInputContainer>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black relative group/btn block w-full rounded-md h-10 font-medium"
            type="submit"
          >
            {isSignUp ? "Sign up" : "Sign in"} &rarr;
            <BottomGradient />
          </motion.button>

          <div className="bg-gradient-to-r from-transparent via-white to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium border border-white"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <IconBrandGoogle className="h-4 w-4 text-white" />
              <span className="text-white text-sm">
                Sign {isSignUp ? "up" : "in"} with Google
              </span>
              <BottomGradient />
            </motion.button>
          </div>
        </form>

        <p className="text-neutral-300 text-sm text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-white underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const AnimatedInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Input
        {...props}
        className="bg-black bg-opacity-50 text-white border-white focus:border-cyan-500 transition-colors duration-300 focus:bg-black focus:bg-opacity-50"
      />
    </motion.div>
  );
};