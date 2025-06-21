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
  subscribers_count: number;
  subscribers_url: string;
  license: License | null;
};

export type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
};
