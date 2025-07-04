"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

interface NavItem {
  name: string;
  href: string;
}

const navs: NavItem[] = [
  {  name: "Assistant", href: "#assistant" },
  {  name: "Profile", href: "#profile" },
  {  name: "About", href: "#about" },
  {  name: "Services", href: "#services" },
  {  name: "Contact", href: "#contact" }
];

interface HeaderProps {
  onTabChange?: (tabName: string) => void;
}

export function Header({ onTabChange }: HeaderProps) {
  const [activeTab, setActiveTab] = useState<string>(navs[0].name);
  const { isSignedIn } = useAuth();

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    onTabChange?.(tabName);
  };

  // Notify parent of initial tab on mount
  useEffect(() => {
    onTabChange?.(activeTab);
  }, []);

  return (
    <header className="mx-auto w-full py-10">
      <div className={cn("mx-auto flex w-full items-center justify-center px-4")}>
        <div className="relative flex w-fit items-center rounded-full border p-1.5">
          {navs.map((option) => (
            <button
              key={option.name}
              onClick={() => handleTabClick(option.name)}
              className={cn("relative z-[1] px-4 py-2", {
                "z-0": activeTab === option.name,
              })}
            >
              {activeTab === option.name && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-full bg-secondary"
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    velocity: 2,
                  }}
                />
              )}
              <span
                className={cn(
                  "relative block text-sm font-medium transition-colors duration-200 hover:text-primary tracking-tight",
                  activeTab === option.name
                    ? "text-primary"
                    : "text-primary/60",
                )}
              >
                {option.name}
              </span>
            </button>
          ))}
          <div className="flex items-center pr-1">
            {isSignedIn ? (
              <div 
                onClick={() => handleTabClick("Profile")} 
                className="cursor-pointer"
              >
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 border rounded-full">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
        
        
      </div>
    </header>
  );
}