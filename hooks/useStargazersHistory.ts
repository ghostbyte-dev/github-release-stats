import type { Release } from '@/types/release';
import { useQuery } from '@tanstack/react-query';

export default function useStargazersHistory(
  user: string,
  repository: string,
): [Release[] | undefined, boolean, boolean] {
  const {
    data: releases,
    isPending: isReleasesPending,
    isError: isReleasesError,
  } = useQuery({
    queryFn: () => fetchStargazersHistory(user, repository),
    queryKey: ['stargazersHistory', user, repository],
  });

  const fetchStargazersHistory = async (user: string, repository: string): Promise<Release[]> => {
    const response = await fetch(`/api/stargazersHistory?user=${user}&repo=${repository}`, {
      cache: 'force-cache',
      next: { revalidate: 86400 },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('response ok');
    const releases: Release[] = await response.json();

    let latestAlreadyUsed = false;
    const modifiedReleases = releases.map((release: Release) => {
      if (release.draft || release.prerelease) {
        release.latest = false;
        return release;
      }
      release.latest = !latestAlreadyUsed;
      latestAlreadyUsed = true;
      return release;
    });

    return modifiedReleases;
  };

  return [releases, isReleasesPending, isReleasesError];
}
