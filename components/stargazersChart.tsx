import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { formatLargeNumber } from '@/common/formatLargeNumber';
import useStargazersHistory from '@/hooks/useStargazersHistory';

type StargazersChartProps = {
  user: string;
  repository: string;
};

const StargazersChart = ({ user, repository }: StargazersChartProps) => {
  const [test] = useStargazersHistory(user, repository);
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
        <Tooltip content={renderTooltip} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const renderTooltip = (props: TooltipContentProps<ValueType, NameType>) => {
  if (props.active && props.label != null) {
    const formattedDate = new Date(props.label).toLocaleDateString();

    return (
      <div className="card bg-bg-secondary">
        <p className="text-lg font-semibold">{formattedDate}:</p>

        {props.payload?.[0] ? (
          <p className="text-lg font-semibold">
            {formatLargeNumber(props.payload[0].value as number)} stars
          </p>
        ) : null}
      </div>
    );
  }

  return null;
};

export default StargazersChart;
