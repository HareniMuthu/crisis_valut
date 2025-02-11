"use client";

import React from "react";
import Link from "next/link";
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="w-full bg-black text-white py-4 px-6 border-b">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <Link
            href="/admin"
            className="text-white hover:text-gray-400 transition-colors duration-200"
          >
            Incidents
          </Link>
          <Link
            href="/admin/contact"
            className="text-white hover:text-gray-400 transition-colors duration-200"
          >
            Contact Submissions
          </Link>
          <Link
            href="/"
            className="text-white hover:text-gray-400 transition-colors duration-200"
          >
            Users Page
          </Link>
        </div>
        <div>
          {isSignedIn ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonOuter: "ml-4",
                },
              }}
            />
          ) : (
            <SignInButton>
              <button className="ml-4 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
