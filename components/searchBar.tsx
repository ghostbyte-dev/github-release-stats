'use client';
import { useState } from 'react';
import Input from './input';
import type { Search } from '@/types/search';

interface SearchBarProps {
  onSubmit: (search: Search) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [user, setUser] = useState<string>('');
  const [repo, setRepo] = useState<string>('');

  const submit = (search: Search) => {
    if (search.repo !== '' && search.user !== '') {
      props.onSubmit(search);
    }
  };

  return (
    <div className="flex flex-col w-full md:max-w-md gap-4">
      <Input
        value={user}
        onChange={setUser}
        label="Username:"
        placeholder="Username / Organization"
      />
      <Input value={repo} onChange={setRepo} label="Repository:" placeholder="Repository" />
      <button
        type="button"
        onClick={() => submit({ user, repo })}
        className="bg-secondary-background rounded-lg py-2 px-4 cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
