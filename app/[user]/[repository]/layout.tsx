import type { Metadata } from 'next/types';
import type React from 'react';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ user: string; repository: string }>;
}): Promise<Metadata> {
  const { user, repository } = await params;

  return {
    title: `Github Release Stats - ${user}/${repository}`,
    description: `Stats of the Github repository ${user}/${repository} and the download stats of the releases of it`,
    creator: 'Ghostbyte.dev Team',
    generator: 'Next.js',
    alternates: {
      canonical: `https://github-release-stats.ghostbyte.dev/${user}/${repository}`,
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
