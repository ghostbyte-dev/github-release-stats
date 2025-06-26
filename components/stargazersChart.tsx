import { formatLargeNumber } from '@/common/formatLargeNumber';
import useStargazersHistory from '@/hooks/useStargazersHistory';
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

type StargazersChartProps = {
  user: string;
  repository: string;
};

const StargazersChart = ({ user, repository }: StargazersChartProps) => {
  const [test] = useStargazersHistory(user, repository);
  console.log(test);
  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart id="test" data={test}>
        <Line type="monotone" dataKey="stars" stroke="#3EB84F" isAnimationActive={true} />
        <XAxis
          dataKey="date"
          stroke="#3D444D"
          scale="time"
          tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
        />
        <YAxis stroke="#3D444D" dataKey={'stars'} />
        <Tooltip content={(value) => renderTooltip(value)} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const renderTooltip = (props: TooltipProps<ValueType, NameType>) => {
  if (props.active) {
    return (
      <div className="card bg-bg-secondary">
        <p className="text-lg font-bold">{new Date(props.label).toLocaleDateString()}:</p>

        {props.payload?.[0] ? (
          <p className="text-lg font-bold">
            {formatLargeNumber(props.payload[0].value as number)} stars
          </p>
        ) : (
          <></>
        )}
      </div>
    );
  }
};

export default StargazersChart;
