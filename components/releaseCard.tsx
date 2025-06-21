import { convertBytes } from "@/common/bytesToSize";
import { formatTimeAgo } from "@/common/formatTimeAgo";
import type { Asset, Release } from "@/types/release";
import { PackageIcon } from "@phosphor-icons/react";
import Image from "next/image";
type ReleaseCardProps = {
	release: Release;
};

const ReleaseCard = ({ release }: ReleaseCardProps) => {
	return (
		<div className="card hover:bg-secondary-background cursor-pointer w-full">
			<div className="flex flex-row gap-4 items-center">
				<a
					href={release.html_url}
					onClick={(e) => e.stopPropagation()}
					className="text-xl font-bold hover:underline"
				>
					{release.name}
				</a>
				{release.latest ? (
					<span className="badge">Latest</span>
				) : release.draft ? (
					<span className="badge border-warning text-warning">Draft</span>
				) : release.prerelease ? (
					<span className="badge border-warning text-warning">Prerelease</span>
				) : (
					<></>
				)}
			</div>
			<div className="flex flex-row gap-2 mt-4">
				<Image
					src={release.author.avatar_url}
					height={24}
					width={24}
					alt={"Avatar"}
					className="rounded-full"
				/>
				<a
					href={release.author.html_url}
					onClick={(e) => e.stopPropagation()}
					className="font-bold hover:underline"
				>
					{release.author.login}
				</a>
				<p>released this {formatTimeAgo(release.published_at)}</p>
			</div>
			{release.assets.map((asset: Asset) => (
				<div key={asset.id} className="flex flex-row gap-2 mt-4 items-center">
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
		</div>
	);
};

export default ReleaseCard;
