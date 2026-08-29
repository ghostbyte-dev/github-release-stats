import { cacheLife, cacheTag } from 'next/cache';
import { connection } from 'next/server';
import type { Metadata } from 'next/types';
import type React from 'react';

async function getRepoMetadata(user: string, repository: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(`repo-${user}-${repository}`);

  return {
    title: `Github Release Stats - ${user}/${repository}`,
    description: `Stats of the Github repository ${user}/${repository} and the download stats of the releases of it`,
    canonical: `https://github-release-stats.ghostbyte.dev/${user}/${repository}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ user: string; repository: string }>;
}): Promise<Metadata> {
  // Mark the metadata resolution context as dynamic
  await connection();

  const { user, repository } = await params;
  const meta = await getRepoMetadata(user, repository);

  return {
    title: meta.title,
    description: meta.description,
    creator: 'Ghostbyte.dev Team',
    generator: 'Next.js',
    alternates: {
      canonical: meta.canonical,
    },
  };
}

export default function RepositoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
