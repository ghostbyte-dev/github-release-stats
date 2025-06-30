'use client';

import Card from '@/components/card';
import Hero from '@/components/hero';
import SearchBar from '@/components/searchBar';
import useLocalStorage from '@/hooks/useLocalStorage';
import { fetchRepository } from '@/hooks/useRepository';
import type { repository } from '@/types/repository';
import type { RepositorySave } from '@/types/repositorySave';
import type { Search } from '@/types/search';
import { useMutation } from '@tanstack/react-query';
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

export default function Home() {
  const [repositories, setRepositories] = useLocalStorage<RepositorySave[]>('repositories', []);
  const repositoryMutation = useMutation({
    mutationFn: (search: Search) => fetchRepository(search.user, search.repo),
    onSuccess: (_repo: repository, search: Search) => addRepoToLocalStorage(search),
    onError: () => onSearchError(),
  });

  const search = (search: Search) => {
    if (repositories.some((repo) => repo.name === search.repo && repo.user === search.user)) {
      toast('This Repository is already added', {
        icon: '🛈',
      });
      return;
    }
    repositoryMutation.mutate(search);
  };

  const addRepoToLocalStorage = (search: Search) => {
    setRepositories([...repositories, { name: search.repo, user: search.user }]);
  };

  const onSearchError = () => {
    toast.error('an error occured');
  };

  const removeRepository = (user: string, repo: string) => {
    setRepositories(
      repositories.filter(
        (repoSave: RepositorySave) => repoSave.name !== repo || repoSave.user !== user,
      ),
    );
  };

  return (
    <>
      <title>Github Release Stats</title>
      <div className="flex justify-center">
        <div className="p-4 lg:p-8  w-full md:w-[90%]">
          <div className="flex flex-row w-full justify-around">
            <Hero />

            <div className="flex justify-center min-w-1/3">
              <SearchBar onSubmit={search} />
            </div>
          </div>
          {repositories.length > 0 && (
            <div className="mt-10">
              <h2 className="font-semibold text-2xl mb-6">Saved Repositories</h2>
              {repositories && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {repositories.toReversed().map((repository: RepositorySave) => (
                    <Card
                      user={repository.user}
                      repositoryName={repository.name}
                      remove={() => removeRepository(repository.user, repository.name)}
                      key={repository.name + repository.user}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-10">
            <h2 className="font-semibold text-2xl mb-6">Cool Repos</h2>
            {coolRepos && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {coolRepos.map((repository: RepositorySave) => (
                  <Card
                    user={repository.user}
                    repositoryName={repository.name}
                    key={repository.name + repository.user}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
