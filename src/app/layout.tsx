// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Policy Platform',
  description: 'A comprehensive platform for tracking AI incidents, legislation, and policy consultations across Africa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-grow bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}