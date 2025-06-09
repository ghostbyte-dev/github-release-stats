"use client";

import Card from "@/components/card";
import SearchBar from "@/components/searchBar";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { RepositorySave } from "@/types/repositorySave";
import type { Search } from "@/types/search";

export default function Home() {
	const [repositories, setRepositories] = useLocalStorage<RepositorySave[]>(
		"repositories",
		[],
	);

	const search = (search: Search) => {
		if (
			repositories.some(
				(repo) => repo.name === search.repo && repo.user === search.user,
			)
		) {
			//toast already exsits
			return;
		}
		setRepositories([
			...repositories,
			{ name: search.repo, user: search.user },
		]);
	};

	return (
		<div>
			<nav className="flex flex-row gap-52">
				<h1 className="text-4xl font-bold">Github Release Counter</h1>
				<SearchBar onSubmit={search} />
			</nav>
			<div className="mt-10">
				{repositories && (
					<div className="grid grid-cols-3 gap-4">
						{repositories.map((repository: RepositorySave) => (
							<div key={repository.name + repository.user}>
								<Card user={repository.user} repositoryName={repository.name} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
