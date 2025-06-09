import type { User } from "./release";

export type repository = {
	id: number;
	name: string;
	full_name: string;
	owner: User;
	private: boolean;
	fork: false;
	html_url: string;
	forks: number;
	stargazers_count: number;
	watchers_count: number;
};
