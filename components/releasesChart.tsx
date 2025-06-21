import type { Asset, Release } from '@/types/release';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type ReleasesChartProps = {
  releases: Release[];
};

const ReleasesChart = ({ releases }: ReleasesChartProps) => {
  const data = releases.toReversed().map((release: Release) => {
    const assetDownloads = release.assets.map((asset: Asset) => asset.download_count);
    const downloadSum =
      assetDownloads.length > 0
        ? assetDownloads.reduce((sum: number, current: number) => sum + current)
        : 0;
    return { release: release.name, downloads: downloadSum };
  });

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart id="test" data={data}>
        <Line type="monotone" dataKey="downloads" stroke="#3EB84F" isAnimationActive={true} />
        <XAxis dataKey="release" stroke="#3D444D" />
        <YAxis stroke="#3D444D" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReleasesChart;
