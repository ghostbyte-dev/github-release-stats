'use client';

import Card from '@/components/card';
import SearchBar from '@/components/searchBar';
import useLocalStorage from '@/hooks/useLocalStorage';
import { fetchRepository } from '@/hooks/useRepository';
import type { repository } from '@/types/repository';
import type { RepositorySave } from '@/types/repositorySave';
import type { Search } from '@/types/search';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function Home() {
  const [repositories, setRepositories] = useLocalStorage<RepositorySave[]>('repositories', []);
  const repositoryMutation = useMutation({
    mutationFn: (search: Search) => fetchRepository(search.user, search.repo),
    onSuccess: (data: repository) => addRepoToLocalStorage(data),
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

  const addRepoToLocalStorage = (repository: repository) => {
    setRepositories([...repositories, { name: repository.name, user: repository.owner.login }]);
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
      <div className="p-8">
        <nav className="flex flex-row gap-52">
          <SearchBar onSubmit={search} />
        </nav>
        <div className="mt-10">
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
      </div>
    </>
  );
}
