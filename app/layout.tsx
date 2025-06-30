'use client';

import { Geist, Inter, Lexend } from 'next/font/google';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from '@/components/navbar';
import type React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import Footer from '@/components/footer';

const font = Lexend({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className="bg-bg text-text duration-200 break-words" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <div className="w-full pt-[81px]">{children}</div>
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
