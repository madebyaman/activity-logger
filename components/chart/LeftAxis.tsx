import { ScaleBand } from 'd3';

type LeftAxisProps = {
  margins: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  yScale: ScaleBand<string>;
};

export function LeftAxis(props: LeftAxisProps) {
  const { margins, yScale } = props;

  return (
    <g transform={`translate(0, ${margins.top})`}>
      {yScale.domain().map((band) => (
        <text
          key={band}
          transform={`translate(0, ${
            (yScale(band) as number) + yScale.bandwidth() / 2
          })`}
          dominantBaseline="hanging"
          fontWeight="bold"
        >
          {band}
        </text>
      ))}
    </g>
  );
}
