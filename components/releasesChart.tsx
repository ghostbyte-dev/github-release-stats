import { formatLargeNumber } from '@/common/formatLargeNumber';
import type { Asset, Release } from '@/types/release';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

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
        <Tooltip content={(value) => renderTooltip(value)} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const renderTooltip = (props: TooltipProps<ValueType, NameType>) => {
  if (props.active) {
    return (
      <div className="card bg-bg-secondary">
        <p className="text-lg font-semibold">{props.label}:</p>
        <p>downloads: {formatLargeNumber(props.payload?.[0].value as number)}</p>
      </div>
    );
  }
};

export default ReleasesChart;
