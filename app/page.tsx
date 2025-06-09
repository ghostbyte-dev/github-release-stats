"use client";

import Card from "@/components/card";
import SearchBar from "@/components/searchBar";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Repository } from "@/types/repository";
import type { Search } from "@/types/search";

export default function Home() {
	const [repositories, setRepositories] = useLocalStorage<Repository[]>(
		"repositories",
		[],
	);

	const search = (search: Search) => {
		setRepositories([
			...repositories,
			{ name: search.repo, user: search.user },
		]);
	};

	return (
		<div>
			<SearchBar onSubmit={search} />
			{repositories && (
				<div className="grid grid-cols-3 gap-4">
					{repositories.map((repository: Repository) => (
						<div key={repository.name}>
							<Card repository={repository} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
