import type { Release } from "@/types/release";
import type { Repository } from "@/types/repository";
import { useQuery } from "@tanstack/react-query";

interface CardProps {
	repository: Repository;
}

const Card = ({ repository }: CardProps) => {
	const { data: releases, isPending: isReleasesPending } = useQuery({
		queryFn: () => fetchReleases(repository),
		queryKey: [repository.name, repository.user],
	});

	const fetchReleases = async (repository: Repository): Promise<Release[]> => {
		const response = await fetch(
			`/api/releases?user=${repository.user}&repo=${repository.name}`,
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		console.log("response ok");
		return response.json();
	};

	return (
		<div className="p-5 bg-neutral-200 rounded-2xl">
			{releases?.[0] !== undefined ? (
				<>
					<div className="flex flex-row gap-4">
						<h3 className="text-2xl font-bold">{releases[0].name}</h3>
					</div>
					<span className="font-bold text-3xl">
						{releases[0].assets[0]?.download_count ?? ""}
					</span>
				</>
			) : isReleasesPending ? (
				<p>loading...</p>
			) : (
				<p>an unexpected error occured</p>
			)}
		</div>
	);
};

export default Card;
