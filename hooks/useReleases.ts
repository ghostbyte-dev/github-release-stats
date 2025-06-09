import type { Release } from "@/types/release";
import { useQuery } from "@tanstack/react-query";

export default function useReleases(
	user: string,
	repository: string,
): [Release[] | undefined, boolean, boolean] {
	const {
		data: releases,
		isPending: isReleasesPending,
		isError: isReleasesError,
	} = useQuery({
		queryFn: () => fetchReleases(user, repository),
		queryKey: [user, repository],
	});

	const fetchReleases = async (
		user: string,
		repository: string,
	): Promise<Release[]> => {
		const response = await fetch(
			`/api/releases?user=${user}&repo=${repository}`,
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		console.log("response ok");
		return response.json();
	};

	return [releases, isReleasesPending, isReleasesError];
}
