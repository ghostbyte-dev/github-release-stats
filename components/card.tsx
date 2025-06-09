import { convertBytes } from "@/common/bytesToSize";
import { formatTimeAgo } from "@/common/formatTimeAgo";
import useReleases from "@/hooks/useReleases";
import type { Asset } from "@/types/release";
import type { Repository } from "@/types/repository";
import { PackageIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardProps {
	repository: Repository;
}

const Card = ({ repository }: CardProps) => {
	const router = useRouter();
	const [releases, isReleasesPending] = useReleases(
		repository.user,
		repository.name,
	);

	const latestRelease = releases?.[0];

	return (
		<button
			className="card hover:bg-secondary-background cursor-pointer w-full"
			type="button"
			onClick={() => router.push(`/${repository.user}/${repository.name}`)}
		>
			{latestRelease !== undefined ? (
				<>
					<div className="flex flex-row gap-4 items-center">
						<a
							href={latestRelease.html_url}
							onClick={(e) => e.stopPropagation()}
							className="text-2xl font-bold hover:underline"
						>
							{latestRelease.name}
						</a>
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
							href={latestRelease.author.html_url}
							onClick={(e) => e.stopPropagation()}
							className="font-bold hover:underline"
						>
							{latestRelease.author.login}
						</a>
						<p>released this {formatTimeAgo(latestRelease.published_at)}</p>
					</div>
					{latestRelease.assets.map((asset: Asset) => (
						<div
							key={asset.id}
							className="flex flex-row gap-2 mt-4 items-center"
						>
							<PackageIcon />
							<a
								href={asset.browser_download_url}
								onClick={(e) => e.stopPropagation()}
								className="font-bold hover:underline"
							>
								{asset.name}
							</a>
							<p className="ml-4">&#9900; {asset.download_count} downloads</p>
							<p className="ml-4">&#9900; {convertBytes(asset.size)}</p>
						</div>
					))}
				</>
			) : isReleasesPending ? (
				<p>loading...</p>
			) : (
				<p>an unexpected error occured</p>
			)}
		</button>
	);
};

export default Card;
