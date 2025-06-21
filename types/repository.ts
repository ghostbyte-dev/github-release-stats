import type { User } from './release';

export type repository = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  homepage: string;
  owner: User;
  private: boolean;
  fork: false;
  html_url: string;
  forks: number;
  forks_url: string;
  stargazers_count: number;
  stargazers_url: string;
  watchers_count: number;
  watchers_url: string;
};
