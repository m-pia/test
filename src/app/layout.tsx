import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tech Testbed',
  description: 'A Next.js project for testing new web technologies.',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-900 text-white`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 py-4 mt-auto">
          <div className="container mx-auto text-center text-gray-400 text-sm">
            © 2025 Tech Testbed. All rights reserved.
          </div>
        </footer>
        <Script src="https://static.robotwebtools.org/EventEmitter2/current/eventemitter2.min.js" />
        <Script src="https://static.robotwebtools.org/roslibjs/current/roslib.min.js" />
        <Script src="https://static.robotwebtools.org/ros2djs/current/ros2d.min.js" />
        <Script src="https://static.robotwebtools.org/ros3djs/current/ros3d.min.js" />
      </body>
    </html>
  );
}
