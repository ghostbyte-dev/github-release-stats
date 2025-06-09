"use client";

import useReleases from "@/hooks/useReleases";
import type { Release } from "@/types/release";
import { useParams } from "next/navigation";

export default function RepositoryDetails() {
	const params = useParams();
	const user = params.user as string;
	const repository = params.repository as string;

	const [releases, isReleasesPending, isReleasesError] = useReleases(
		user,
		repository,
	);

	if (isReleasesError) {
		return <div>error</div>;
	}

	if (isReleasesPending) {
		return <div>Loading...</div>;
	}

	if (releases) {
		return (
			<div>
				{releases.map((release: Release) => (
					<div key={release.url}>{release.name}</div>
				))}
			</div>
		);
	}

	return <>an unexpected error occured</>;
}
