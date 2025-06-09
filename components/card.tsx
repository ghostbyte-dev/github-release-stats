import { formatTimeAgo } from "@/common/formatTimeAgo";
import type { Release } from "@/types/release";
import type { Repository } from "@/types/repository";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

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

	const latestRelease = releases?.[0];

	return (
		<div className="card">
			{latestRelease !== undefined ? (
				<>
					<div className="flex flex-row gap-4 items-center">
						<h3 className="text-2xl font-bold">{latestRelease.name}</h3>
						<span className="badge">Latest</span>
					</div>
					<div className="flex flex-row gap-2 mt-4">
						<Image
							src={latestRelease.author.avatar_url}
							height={24}
							width={24}
							alt={"Avatar"}
							className="rounded-full"
						/>
						<a
							href={latestRelease.author.url}
							className="font-bold hover:underline"
						>
							{latestRelease.author.login}
						</a>
						<p>released this {formatTimeAgo(latestRelease.published_at)}</p>
					</div>
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
