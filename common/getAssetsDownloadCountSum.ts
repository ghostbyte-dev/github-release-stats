import type { Asset, Release } from '@/types/release';

export const getAssetsDownloadCountSum = (release: Release): number => {
  const assetDownloads = release.assets.map((asset: Asset) => asset.download_count);
  return assetDownloads.length > 0
    ? assetDownloads.reduce((sum: number, current: number) => sum + current)
    : 0;
};
