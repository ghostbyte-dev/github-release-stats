import { Lexend } from 'next/font/google';
import './globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from '@/components/navbar';
import type React from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/footer';
import Providers from './providers';
import type { Metadata } from 'next/types';

const font = Lexend({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Github Release Stats',
  description:
    'Github Release Stats is a tool to check the stats of Github repositories. You can check the download history of releases and the star history of repositories.',
  creator: 'Ghostbyte.dev Team',
  generator: 'Next.js',
  alternates: {
    canonical: 'https://github-release-stats.ghostbyte.dev/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-bg text-text duration-200" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <Providers>
          <Navbar />
          <div className="w-full pt-[81px]">{children}</div>
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
