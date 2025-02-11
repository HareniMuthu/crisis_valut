"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-white/60 backdrop-blur-md`}
    >
      <div className="border-b border-gray-300">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="pl-6 text-3xl font-medium text-gray-800">
            <Link href="/" className="hover:opacity-80">
              Crisis Manager
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-12 text-lg font-medium text-gray-600">
            <Link
              href="/"
              className="hover:text-gray-800 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/incident"
              className="hover:text-gray-800 transition-colors duration-200"
            >
              Incident
            </Link>
            <Link
              href="/training"
              className="hover:text-gray-800 transition-colors duration-200"
            >
              Training
            </Link>
            <Link
              href="/contactus"
              className="hover:text-gray-800 transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/profile"
              className="hover:text-gray-800 transition-colors duration-200"
            >
              Profile
            </Link>
            <Link
              href="/admin"
              className="hover:text-gray-800 transition-colors duration-200"
            >
              Admin
            </Link>
          </div>

          {/* Profile or Sign-In Button */}
          <div className="pr-6 text-lg font-medium text-gray-600">
            <SignedIn>
              {/* Show UserButton when signed in */}
              <UserButton />
            </SignedIn>
            <SignedOut>
              {/* Show SignInButton when signed out */}
              <SignInButton>
                <button className="hover:text-gray-800 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
