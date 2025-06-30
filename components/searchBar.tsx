'use client';
import { useState } from 'react';
import Input from './input';
import type { Search } from '@/types/search';
import { fetchRepository } from '@/hooks/useRepository';
import type { repository } from '@/types/repository';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useLocalStorageContext } from '@/context/LocalStorageContext';

const SearchBar = () => {
  const [user, setUser] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const { repositories, setRepositories } = useLocalStorageContext();

  const submit = (search: Search) => {
    if (search.repo !== '' && search.user !== '') {
      searchFunction(search);
    }
  };

  const repositoryMutation = useMutation({
    mutationFn: (search: Search) => fetchRepository(search.user, search.repo),
    onSuccess: (_repo: repository, search: Search) => addRepoToLocalStorage(search),
    onError: () => onSearchError(),
  });

  const searchFunction = (search: Search) => {
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

  return (
    <div className="flex flex-col w-full md:max-w-md gap-4 mt-10 mb-6">
      <Input
        value={user}
        onChange={setUser}
        label="Username:"
        placeholder="Username / Organization"
      />
      <Input value={repo} onChange={setRepo} label="Repository:" placeholder="Repository" />
      <button type="button" onClick={() => submit({ user, repo })} className="btn">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
