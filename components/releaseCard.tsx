import { formatTimeAgo } from '@/common/formatTimeAgo';
import type { Release } from '@/types/release';
import { DownloadIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import ReactionsComponent from './reactions';
import { getAssetsDownloadCountSum } from '@/common/getAssetsDownloadCountSum';
import { formatLargeNumber } from '@/common/formatLargeNumber';
import Assets from './assets';
import Link from 'next/link';
type ReleaseCardProps = {
  release: Release;
};

const ReleaseCard = ({ release }: ReleaseCardProps) => {
  return (
    <div className="card w-full">
      <div className="flex flex-row gap-4 items-center">
        <Link
          href={release.html_url}
          onClick={(e) => e.stopPropagation()}
          className="text-2xl font-bold hover:underline"
        >
          {release.name}
        </Link>
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
          alt={'Avatar'}
          className="rounded-full w-6 h-6"
        />
        <Link
          href={release.author.html_url}
          onClick={(e) => e.stopPropagation()}
          className="font-bold hover:underline"
        >
          {release.author.login}
        </Link>
        <p>released this {formatTimeAgo(release.published_at)}</p>
      </div>
      <div className="flex flex-row gap-2 mt-2">
        <DownloadIcon size={24} />
        <span className="font-bold text-primary">
          {formatLargeNumber(getAssetsDownloadCountSum(release))}
        </span>
        downloads
      </div>

      <hr className="my-4 h-0.5 border-t-0 rounded-full bg-neutral-100 dark:bg-white/10" />

      <Assets assets={release.assets} clickable />

      {release.reactions ? (
        <div className="mt-4">
          <ReactionsComponent reactions={release.reactions} />{' '}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ReleaseCard;
