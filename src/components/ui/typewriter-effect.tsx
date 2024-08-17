"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.2, // Reduced from 0.3 to increase speed
          delay: stagger(0.05), // Reduced from 0.1 to increase speed
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `text-white opacity-0 hidden text-lg`, // Increased text size from base to lg
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              {idx < wordsArray.length - 1 && (
                <motion.span
                  initial={{}}
                  className="text-white opacity-0 hidden text-lg"
                >
                  &nbsp;
                </motion.span>
              )}
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-lg", // Increased text size from base to lg
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[2px] h-5 bg-blue-500", // Increased height from h-4 to h-5
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const word = words[currentWordIndex].text;
    const typingSpeed = 50; // Adjust for faster/slower typing
    const deletingSpeed = 30; // Adjust for faster/slower deleting

    if (!isDeleting && currentText !== word) {
      const timeout = setTimeout(() => {
        setCurrentText(word.slice(0, currentText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentText !== "") {
      const timeout = setTimeout(() => {
        setCurrentText(word.slice(0, currentText.length - 1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    } else if (currentText === word && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (currentText === "" && isDeleting) {
      setIsDeleting(false);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
  }, [words, currentWordIndex, currentText, isDeleting]);

  return (
    <div className={cn("flex justify-center items-center my-2", className)}>
      <div className="text-xl md:text-2xl text-center"> {/* Increased text size here */}
        <span className={words[currentWordIndex].className}>{currentText}</span>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("block rounded-sm w-[2px] h-6 bg-blue-500 ml-1", cursorClassName)} // Increased cursor height
      />
    </div>
  );
};