import Card from '@/components/card';
import Hero from '@/components/hero';
import LocalRepositories from '@/components/localRepositories';
import SearchBar from '@/components/searchBar';
import useLocalStorage from '@/hooks/useLocalStorage';
import { fetchReleases } from '@/hooks/useReleases';
import { fetchRepository } from '@/hooks/useRepository';
import type { repository } from '@/types/repository';
import type { RepositorySave } from '@/types/repositorySave';
import type { Search } from '@/types/search';
import { dehydrate, HydrationBoundary, QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const coolRepos: RepositorySave[] = [
  {
    user: 'signalapp',
    name: 'Signal-Android',
  },
  {
    user: 'bluesky-social',
    name: 'social-app',
  },
  {
    user: 'mastodon',
    name: 'mastodon-android',
  },
  {
    user: 'streetcomplete',
    name: 'StreetComplete',
  },
  {
    user: 'pixelfed',
    name: 'pixelfed-rn',
  },
  {
    user: 'ghostbyte-dev',
    name: 'pixelix',
  },
  {
    user: 'bitwarden',
    name: 'server',
  },
  {
    user: 'duckduckgo',
    name: 'Android',
  },
  {
    user: 'JetBrains',
    name: 'kotlin',
  },
];

export default async function Home() {
  const queryClient = new QueryClient();

  await coolRepos.map(async (coolRepo: RepositorySave) => {
    await queryClient.prefetchQuery({
      queryKey: ['releases', coolRepo.user, coolRepo.name],
      queryFn: () => fetchReleases(coolRepo.user, coolRepo.name),
    });
    await queryClient.prefetchQuery({
      queryKey: ['repository', coolRepo.user, coolRepo.name],
      queryFn: () => fetchRepository(coolRepo.user, coolRepo.name),
    });
  });

  return (
    <>
      <title>Github Release Stats</title>
      <div className="flex justify-center">
        <div className="p-4 lg:p-8  w-full md:w-[90%]">
          <div className="flex flex-row w-full justify-around items-center">
            <Hero />
            <div className="flex justify-center min-w-1/3">
              <SearchBar />
            </div>
          </div>
          <LocalRepositories />
          <div className="mt-10">
            <h2 className="font-semibold text-2xl mb-6">Cool Repos</h2>
            {coolRepos && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {coolRepos.map((repository: RepositorySave) => (
                  <HydrationBoundary
                    state={dehydrate(queryClient)}
                    key={repository.name + repository.user}
                  >
                    <Card user={repository.user} repositoryName={repository.name} />
                  </HydrationBoundary>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
