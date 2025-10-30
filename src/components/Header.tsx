'use client';

import { useState } from 'react';
import Link from 'next/link';
import HamburgerIcon from './icons/HamburgerIcon';
import CloseIcon from './icons/CloseIcon';

const menuItems = [
  { href: '/demos/tensorflow', label: 'TensorFlow' },
  { href: '/demos/ros', label: 'ROS' },
  { href: '/demos/react', label: 'React' },
  { href: '/demos/tailwind', label: 'Tailwind CSS' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 shadow-md relative">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          Tech Testbed
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-gray-300 hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="text-white">
            <HamburgerIcon />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Overlay) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu (Content) */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-800 w-64 transform transition-transform z-50 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 flex justify-end">
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            <CloseIcon />
          </button>
        </div>
        <nav className="flex flex-col p-6 space-y-4">
          <Link href="/" className="text-xl font-bold text-white">
            Tech Testbed
          </Link>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-white text-lg transition-colors"
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
