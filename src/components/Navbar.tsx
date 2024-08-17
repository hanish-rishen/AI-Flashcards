"use client"
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navbar({ className }: { className?: string }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-4 inset-x-0 max-w-2xl mx-auto z-50 rounded-full",
          className
        )}
      >
        <motion.div
          className="p-[1px] rounded-full bg-gradient-to-b from-white/40 to-white/10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Menu setActive={setActiveItem}>
            <div className="p-2 bg-black/50 backdrop-blur-md rounded-full">
              <MenuItem item="Services" setActive={setActiveItem} active={activeItem}>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/create">Create Flashcards</HoveredLink>
                  <HoveredLink href="/study">Study</HoveredLink>
                  <HoveredLink href="/progress">Progress</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem item="Products" setActive={setActiveItem} active={activeItem}>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/flashcards">Flashcard Sets</HoveredLink>
                  <HoveredLink href="/ai-tutor">AI Tutor</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem item="Pricing" setActive={setActiveItem} active={activeItem}>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/pricing">Plans</HoveredLink>
                  <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                </div>
              </MenuItem>
            </div>
          </Menu>
        </motion.div>
      </motion.div>
    </div>
  );
}