import { ScaleLinear } from 'd3';

export function BottomAxis(props: {
  margins: { top: number; left: number; right: number; bottom: number };
  boundedHeight: number;
  xScale: ScaleLinear<number, number, never>;
}) {
  const { margins, xScale, boundedHeight } = props;

  return (
    <g transform={`translate(${margins.left}, ${boundedHeight + margins.top})`}>
      {xScale.ticks().map((tick) => (
        <g key={tick}>
          <rect
            height="15"
            width="3"
            transform={`translate(${xScale(tick)})`}
          />
          <text
            fontSize=".75rem"
            dominantBaseline="hanging"
            textAnchor="middle"
            transform={`translate(${xScale(tick) + 1.5}, 17)`}
          >
            {tick}
          </text>
        </g>
      ))}
    </g>
  );
}
