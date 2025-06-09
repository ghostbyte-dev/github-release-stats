"use client";

import useReleases from "@/hooks/useReleases";
import useRepository from "@/hooks/useRepository";
import { useParams } from "next/navigation";

export default function RepositoryDetails() {
	const params = useParams();
	const user = params.user as string;
	const repositoryName = params.repository as string;
	console.log(repositoryName);

	const [releases, isReleasesPending, isReleasesError] = useReleases(
		user,
		repositoryName,
	);

	const [repository, isRepositoryPending, isRepositoryError] = useRepository(
		user,
		repositoryName,
	);

	if (isReleasesError || isRepositoryError) {
		return <div>error</div>;
	}

	if (isReleasesPending || isRepositoryPending) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{repository ? <div>{repository.full_name}</div> : <></>}
			{releases ? <>{releases.length}</> : <></>}
		</div>
	);
}
