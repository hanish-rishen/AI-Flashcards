"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { IconBrandGoogle, IconRocket } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black bg-opacity-80 border border-white backdrop-blur-sm"
    >
      <h2 className="font-bold text-xl text-white">
        Welcome to AI Flashcards
      </h2>
      <p className="text-neutral-300 text-sm max-w-sm mt-2">
        Sign up to start your personalized learning journey
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-white">First name</Label>
            <AnimatedInput id="firstname" placeholder="John" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-white">Last name</Label>
            <AnimatedInput id="lastname" placeholder="Doe" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-white">Email Address</Label>
          <AnimatedInput id="email" placeholder="johndoe@example.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-white">Password</Label>
          <AnimatedInput id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black relative group/btn block w-full rounded-md h-10 font-medium"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </motion.button>

        <div className="bg-gradient-to-r from-transparent via-white to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium border border-white"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-white" />
            <span className="text-white text-sm">
              Sign up with Google
            </span>
            <BottomGradient />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium border border-white"
            type="button"
          >
            <IconRocket className="h-4 w-4 text-white" />
            <span className="text-white text-sm">
              Try it out first
            </span>
            <BottomGradient />
          </motion.button>
        </div>
      </form>
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
