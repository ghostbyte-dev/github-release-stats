import { convertBytes } from '@/common/bytesToSize';
import { formatLargeNumber } from '@/common/formatLargeNumber';
import { formatTimeAgo } from '@/common/formatTimeAgo';
import useReleases from '@/hooks/useReleases';
import useRepository from '@/hooks/useRepository';
import type { Asset, Release } from '@/types/release';
import {
  DownloadIcon,
  EyeIcon,
  GitForkIcon,
  PackageIcon,
  StarIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ReactionsComponent from './reactions';
import { getReleasesDownloadsCount } from '@/common/getReleasesDownloadsCount';

interface CardProps {
  user: string;
  repositoryName: string;
  remove: () => void;
}

const Card = ({ user, repositoryName, remove }: CardProps) => {
  const router = useRouter();
  const [releases, isReleasesPending] = useReleases(user, repositoryName);
  const [repository, isRepositoryPending] = useRepository(user, repositoryName);

  const latestRelease = releases?.find((release: Release) => release.latest);

  return (
    <button
      className="card hover:bg-secondary-background cursor-pointer w-full h-full flex flex-col"
      type="button"
      onClick={() => router.push(`/${user}/${repositoryName}`)}
    >
      {latestRelease !== undefined && repository ? (
        <>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-4 items-center">
              <Image
                src={repository.owner.avatar_url}
                height={32}
                width={32}
                alt={'Avatar'}
                className="rounded-full"
              />
              <a
                href={repository.html_url}
                onClick={(e) => e.stopPropagation()}
                className="text-2xl font-bold hover:underline"
              >
                {repository.full_name}
              </a>
            </div>
            <div>
              <TrashIcon
                size={24}
                className="cursor-pointer hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  remove();
                }}
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center mt-4">
            <div className="flex flex-row gap-2">
              <StarIcon size={24} color="#e3b341" weight="fill" />
              <p className="font-bold text-lg">{formatLargeNumber(repository.stargazers_count)}</p>
            </div>
            <div className="flex flex-row gap-2">
              <GitForkIcon size={24} color="#3D444D" />{' '}
              <p className="font-bold text-lg">{formatLargeNumber(repository.forks)}</p>
            </div>
            <div className="flex flex-row gap-2">
              <EyeIcon size={24} color="#3D444D" />{' '}
              <p className="font-bold text-lg">{formatLargeNumber(repository.subscribers_count)}</p>
            </div>
            <div className="flex flex-row gap-2">
              <DownloadIcon size={24} color="#3D444D" />{' '}
              <p className="font-bold text-lg">
                {formatLargeNumber(getReleasesDownloadsCount(releases ?? []))}
              </p>
            </div>
          </div>
          <hr className="my-4 h-0.5 border-t-0 rounded-full bg-neutral-100 dark:bg-white/10" />
          <div className="flex flex-row gap-4 items-center">
            <a
              href={latestRelease.html_url}
              onClick={(e) => e.stopPropagation()}
              className="text-xl font-bold hover:underline"
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
              alt={'Avatar'}
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
          {latestRelease.assets.slice(0, 5).map((asset: Asset) => (
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
          {latestRelease.reactions ? (
            <div className="mt-4">
              <ReactionsComponent reactions={latestRelease.reactions} />{' '}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : isReleasesPending || isRepositoryPending ? (
        <p>loading...</p>
      ) : (
        <div className="flex flex-row justify-between">
          <p>an unexpected error occured</p>
          <TrashIcon
            size={24}
            className="cursor-pointer hover:text-red-400"
            onClick={(e) => {
              e.stopPropagation();
              remove();
            }}
          />
        </div>
      )}
    </button>
  );
};

export default Card;
