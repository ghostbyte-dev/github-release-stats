import { Lexend } from 'next/font/google';
import './globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from '@/components/navbar';
import type React from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/footer';
import Providers from './providers';
import type { Metadata } from 'next/types';
import Head from 'next/head';

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

function addProductJsonLd() {
  return {
    __html: `{
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "name": "Github Release Stats",
    "image": [
      "https://github-release-stats.ghostbyte.dev/schemaImages/homepage.png",
      "https://github-release-stats.ghostbyte.dev/schemaImages/repositoryPixelix.png",
      "https://github-release-stats.ghostbyte.dev/schemaImages/repositoryBluesky.png"
     ],
    "description": "Github Release Stats is a tool to check the stats of Github repositories and the releases of it. You can check out the downloads history of releases and the star history of repositories.",
    "applicationCategory": ["Development", "Data Visualization", "Github"],
    "sameAs": "https://github.com/ghostbyte-dev/github-release-stats",
    "author": [
    {
      "@type": "Organization",
      "name": "Ghostbyte",
    },
    {
      "@type": "Person",
      "name": "Daniel Hiebeler",
    },
    {
      "@type": "Person",
      "name": "Emanuel Hiebeler",
    },
  ]
  }
`,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-bg text-text duration-200" suppressHydrationWarning>
      <Head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
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
