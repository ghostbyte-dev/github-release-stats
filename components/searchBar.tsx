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
    <div className="flex flex-row gap-4">
      <Input value={user} onChange={setUser} label="User:" placeholder="username / organization" />
      <Input value={repo} onChange={setRepo} label="Repository:" placeholder="repository" />
      <button
        type="button"
        onClick={() => submit({ user, repo })}
        className="bg-secondary-background rounded-lg px-4 cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
