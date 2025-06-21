'use client';

import useReleases from '@/hooks/useReleases';
import useRepository from '@/hooks/useRepository';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  BookOpenIcon,
  EyeIcon,
  GitForkIcon,
  LinkIcon,
  PulseIcon,
  ScalesIcon,
  StarIcon,
} from '@phosphor-icons/react';
import dynamic from 'next/dynamic';
import type { Release } from '@/types/release';
import ReleaseCard from '@/components/releaseCard';
import { formatLargeNumber } from '@/common/formatLargeNumber';
const MyChart = dynamic(() => import('../../../components/releasesChart'), {
  ssr: false,
});
export default function RepositoryDetails() {
  const params = useParams();
  const user = params.user as string;
  const repositoryName = params.repository as string;
  console.log(repositoryName);

  const [releases, isReleasesPending] = useReleases(user, repositoryName);

  const [repository, isRepositoryPending] = useRepository(user, repositoryName);

  return (
    <div className="flex flex-col p-4 lg:p-8">
      <div>
        {repository ? (
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={repository.owner.avatar_url}
              height={48}
              width={48}
              alt={'Avatar'}
              className="rounded-full h-12 w-12 aspect-square"
            />
            <h1 className="text-2xl font-medium">
              {repository.owner.login} <span className="text-gray-300 font-extralight">/</span>{' '}
              <span className="font-bold">{repository.name}</span>
            </h1>
          </div>
        ) : isRepositoryPending ? (
          <>Loading...</>
        ) : (
          <>an error occured</>
        )}
      </div>
      <div className="flex flex-wrap-reverse flex-row mt-10 gap-y-4">
        <div className="flex-2/3 card">
          {releases ? (
            <MyChart releases={releases} />
          ) : isReleasesPending ? (
            <>Loading...</>
          ) : (
            <>an error occured</>
          )}
        </div>
        <div className="flex-1/3">
          {repository ? (
            <div className="ml-8 gap-1 flex flex-col">
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl">About</h3>
                <p>{repository.description}</p>
                <div className="flex flex-row gap-3 mt-1 text-sm">
                  <LinkIcon size={16} weight="bold" />
                  <a href={repository.homepage} className="text-link hover:underline font-bold">
                    {repository.homepage}
                  </a>
                </div>
              </div>
              <a
                className="flex flex-row mt-4 gap-3 hover:text-link text-secondary-text"
                href={`${repository.html_url}#readme-ov-file`}
              >
                <BookOpenIcon size={18} weight="bold" />
                <div className="flex flex-row gap-1 text-sm">
                  <p>Readme</p>
                </div>
              </a>
              {repository.license ? (
                <a
                  className="flex flex-row gap-3 hover:text-link text-secondary-text"
                  href={`${repository.html_url}#${repository.license.spdx_id}-1-ov-file`}
                >
                  <ScalesIcon size={18} weight="bold" />
                  <div className="flex flex-row gap-1 text-sm">
                    <p>{repository.license.spdx_id}</p>
                    <p>licence</p>
                  </div>
                </a>
              ) : (
                <a
                  className="flex flex-row gap-3 hover:text-link text-secondary-text"
                  href={`${repository.html_url}#security-ov-file`}
                >
                  <ScalesIcon size={18} weight="bold" />
                  <div className="flex flex-row gap-1 text-sm">
                    <p>Security policy</p>
                  </div>
                </a>
              )}
              <a
                className="flex flex-row gap-3 hover:text-link text-secondary-text"
                href={`${repository.html_url}/activity`}
              >
                <PulseIcon size={18} weight="bold" />
                <div className="flex flex-row gap-1 text-sm">
                  <p>Activity</p>
                </div>
              </a>
              <a
                className="flex flex-row gap-3 hover:text-link text-secondary-text"
                href={repository.stargazers_url}
              >
                <StarIcon size={18} weight="bold" />
                <div className="flex flex-row gap-1 text-sm">
                  <p className="font-bold">{formatLargeNumber(repository.stargazers_count)}</p>
                  <p>stars</p>
                </div>
              </a>
              <a
                className="flex flex-row gap-3 hover:text-link text-secondary-text"
                href={repository.subscribers_url}
                //watcher url not found
              >
                <EyeIcon size={18} weight="bold" />
                <div className="flex flex-row gap-1 text-sm">
                  <p className="font-bold">{formatLargeNumber(repository.subscribers_count)}</p>
                  <p>watchers</p>
                </div>
              </a>
              <a
                className="flex flex-row gap-3 hover:text-link text-secondary-text"
                href={repository.forks_url}
              >
                <GitForkIcon size={18} weight="bold" />
                <div className="flex flex-row gap-1 text-sm">
                  <p className="font-bold">{formatLargeNumber(repository.forks)}</p>
                  <p>forks</p>
                </div>
              </a>
            </div>
          ) : isRepositoryPending ? (
            <>Loading...</>
          ) : (
            <>an error occured</>
          )}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-4">Releases:</h2>
        {releases ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {releases.map((release: Release) => (
              <ReleaseCard release={release} key={release.url} />
            ))}
          </div>
        ) : isReleasesPending ? (
          <>Loading...</>
        ) : (
          <>error</>
        )}
      </div>
    </div>
  );
}
