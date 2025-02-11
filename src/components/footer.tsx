"use client";
import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
          {/* Logo Section */}
          <div>
            <h1 className="text-2xl font-bold">Crisis Manager</h1>
            <p className="mt-2 text-sm text-gray-400">
              Your partner in tackling crises effectively.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex space-x-12">
            <div>
              <h2 className="font-semibold text-lg mb-4">Navigation</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-gray-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/incident" className="hover:text-gray-400">
                    Report an Incident
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="hover:text-gray-400">
                    Training
                  </Link>
                </li>
                <li>
                  <Link href="/contactus" className="hover:text-gray-400">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-4">Resources</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="hover:text-gray-400">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-gray-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-gray-400">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Follow Us</h2>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400"
                  aria-label="Twitter"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Crisis Manager. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
