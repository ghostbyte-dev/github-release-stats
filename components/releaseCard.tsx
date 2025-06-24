import { convertBytes } from '@/common/bytesToSize';
import { formatTimeAgo } from '@/common/formatTimeAgo';
import type { Asset, Release } from '@/types/release';
import { DownloadIcon, PackageIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import ReactionsComponent from './reactions';
import { getAssetsDownloadCountSum } from '@/common/getAssetsDownloadCountSum';
import { formatLargeNumber } from '@/common/formatLargeNumber';
import { useState } from 'react';
type ReleaseCardProps = {
  release: Release;
};

const ReleaseCard = ({ release }: ReleaseCardProps) => {
  const [isExpandedAssets, setIsExpandedAssets] = useState<boolean>(false);

  const getAssets = (): Asset[] => {
    if (isExpandedAssets) {
      return release.assets;
    }
    return release.assets.slice(0, 4);
  };

  return (
    <div className="card w-full">
      <div className="flex flex-row gap-4 items-center">
        <a
          href={release.html_url}
          onClick={(e) => e.stopPropagation()}
          className="text-2xl font-bold hover:underline"
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
          alt={'Avatar'}
          className="rounded-full w-6 h-6"
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
      <div className="flex flex-row gap-2 mt-2">
        <DownloadIcon size={24} />
        {formatLargeNumber(getAssetsDownloadCountSum(release))} downloads
      </div>

      <hr className="my-4 h-0.5 border-t-0 rounded-full bg-neutral-100 dark:bg-white/10" />

      <h3 className="text-xl font-bold">Assets:</h3>
      {getAssets().map((asset: Asset) => (
        <div key={asset.id} className="flex flex-row gap-2 mt-5 items-center">
          <PackageIcon size={24} />
          <div>
            <a
              href={asset.browser_download_url}
              onClick={(e) => e.stopPropagation()}
              className="font-bold hover:underline"
            >
              {asset.name}
            </a>

            <div className="flex space-x-5 mt-1">
              <p className="">{asset.download_count} downloads</p>
              <p className="">{convertBytes(asset.size)}</p>
            </div>
          </div>
        </div>
      ))}
      {release.assets.length >= 5 && !isExpandedAssets ? (
        <button
          className="cursor-pointer text-sm"
          type="button"
          onClick={() => setIsExpandedAssets(true)}
        >
          show all
        </button>
      ) : (
        <button
          className="cursor-pointer text-sm"
          type="button"
          onClick={() => setIsExpandedAssets(false)}
        >
          show less
        </button>
      )}
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
