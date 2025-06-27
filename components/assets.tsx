'use client';

import { convertBytes } from '@/common/bytesToSize';
import type { Asset } from '@/types/release';
import { PackageIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';

interface AssetsProps {
  assets: Asset[];
  clickable?: boolean;
}

const Assets = ({ assets = [], clickable = false }: AssetsProps) => {
  const [isExpandedAssets, setIsExpandedAssets] = useState<boolean>(false);

  const getAssets = (): Asset[] => {
    if (isExpandedAssets) {
      return assets;
    }
    return assets.slice(0, 4);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold">
        {assets.length} Asset{assets.length !== 1 && 's'}
        {assets.length > 0 && ':'}
      </h3>
      {getAssets().map((asset: Asset) => (
        <div key={asset.id} className="flex flex-row gap-2 mt-3 items-center">
          <PackageIcon size={24} />
          <div>
            {clickable ? (
              <Link
                href={asset.browser_download_url}
                onClick={(e) => e.stopPropagation()}
                className="font-semibold hover:underline"
              >
                {asset.name}
              </Link>
            ) : (
              <span className="font-semibold">{asset.name}</span>
            )}

            <div className="flex space-x-5">
              <span>
                <span className="font-semibold text-primary">{asset.download_count}</span> downloads
              </span>
              <span>{convertBytes(asset.size)}</span>
            </div>
          </div>
        </div>
      ))}
      {clickable && assets.length >= 5 && !isExpandedAssets && (
        <button
          className="cursor-pointer text-sm"
          type="button"
          onClick={() => setIsExpandedAssets(true)}
        >
          show all
        </button>
      )}

      {clickable && assets.length >= 5 && isExpandedAssets && (
        <button
          className="cursor-pointer text-sm"
          type="button"
          onClick={() => setIsExpandedAssets(false)}
        >
          show less
        </button>
      )}

      {!clickable && assets.length > 4 && (
        <div className="pt-3">
          <span>and {assets.length - 4} more</span>
        </div>
      )}
    </div>
  );
};

export default Assets;
