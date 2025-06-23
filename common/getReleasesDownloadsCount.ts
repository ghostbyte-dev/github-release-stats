import type { Release } from '@/types/release';
import { getAssetsDownloadCountSum } from './getAssetsDownloadCountSum';

export const getReleasesDownloadsCount = (releases: Release[]): number => {
  const releasesDownloads = releases?.map((release: Release) => getAssetsDownloadCountSum(release));
  return releasesDownloads?.reduce((sum: number, current: number) => sum + current) ?? 0;
};
