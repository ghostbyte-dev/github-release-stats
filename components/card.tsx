import { formatLargeNumber } from '@/common/formatLargeNumber';
import { formatTimeAgo } from '@/common/formatTimeAgo';
import useReleases from '@/hooks/useReleases';
import { useRepository } from '@/hooks/useRepository';
import type { Release } from '@/types/release';
import { DownloadIcon, EyeIcon, GitForkIcon, StarIcon, TrashIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import ReactionsComponent from './reactions';
import { getReleasesDownloadsCount } from '@/common/getReleasesDownloadsCount';
import Link from 'next/link';
import Assets from './assets';
import LoadingIndicator from './loadingIndicator';

interface CardProps {
  user: string;
  repositoryName: string;
  remove?: () => void;
}

const Card = ({ user, repositoryName, remove }: CardProps) => {
  const [releases] = useReleases(user, repositoryName);
  const [repository, isRepositoryPending, isRepositoryError] = useRepository(user, repositoryName);

  const latestRelease = releases?.find((release: Release) => release.latest);

  if (isRepositoryError) {
    return <div className="card">an error occured</div>;
  }
  return (
    <Link
      href={`/${user}/${repositoryName}`}
      className="card hover:bg-bg-secondary cursor-pointer w-full h-full flex flex-col"
      type="button"
    >
      {repository ? (
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
              <span className="text-2xl font-semibold">{repository.full_name}</span>
            </div>
            {remove && (
              <div>
                <TrashIcon
                  size={24}
                  className="cursor-pointer hover:text-red-400"
                  onClick={(e) => {
                    e.preventDefault();
                    remove();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-row md:gap-10 justify-around md:justify-start items-center mt-4">
            <div className="flex flex-row items-center gap-2">
              <StarIcon size={24} color="#e3b341" weight="fill" />
              <p className="font-semibold text-lg">
                {formatLargeNumber(repository.stargazers_count)}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <GitForkIcon size={24} color="#3D444D" />{' '}
              <p className="font-semibold text-lg">{formatLargeNumber(repository.forks)}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <EyeIcon size={24} color="#3D444D" />{' '}
              <p className="font-semibold text-lg">
                {formatLargeNumber(repository.subscribers_count)}
              </p>
            </div>
            {releases && (releases?.length ?? [].length) > 0 && (
              <div className="flex flex-row items-center gap-2">
                <DownloadIcon size={24} color="#3D444D" />{' '}
                <p className="font-semibold text-lg text-primary">
                  {formatLargeNumber(getReleasesDownloadsCount(releases))}
                </p>
              </div>
            )}
          </div>
          {latestRelease !== undefined ? (
            <>
              <hr className="my-4 h-0.5 border-t-0 rounded-full bg-neutral-100 dark:bg-white/10" />

              <div className="flex flex-row gap-4 items-center">
                <span className="text-xl font-semibold">
                  {' '}
                  {latestRelease.name === '' || !latestRelease.name
                    ? latestRelease.tag_name
                    : latestRelease.name}
                </span>
                <span className="badge">Latest</span>
              </div>
              <div className="flex flex-row gap-2 mt-4 mb-4">
                <Image
                  src={latestRelease.author.avatar_url}
                  height={24}
                  width={24}
                  alt={'Avatar'}
                  className="rounded-full"
                />
                <span className="font-semibold">{latestRelease.author.login}</span>
                <p>released this {formatTimeAgo(latestRelease.published_at)}</p>
              </div>

              <Assets assets={latestRelease.assets} />

              {latestRelease.reactions ? (
                <div className="mt-4">
                  <ReactionsComponent reactions={latestRelease.reactions} />{' '}
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ) : isRepositoryPending ? (
        <LoadingIndicator />
      ) : (
        <div className="flex flex-row justify-between">
          <p>an unexpected error occured</p>
          {remove && (
            <TrashIcon
              size={24}
              className="cursor-pointer hover:text-red-400"
              onClick={(e) => {
                e.stopPropagation();
                remove();
              }}
            />
          )}
        </div>
      )}
    </Link>
  );
};

export default Card;
