import { scaleLinear, max, scaleBand, scaleOrdinal } from 'd3';
import { BottomAxis } from './BottomAxis';
import { LeftAxis } from './LeftAxis';

type DataProps = {
  name: string;
  value: number;
  scale: string;
};

type ChartProps = {
  data: DataProps[];
  dimensions: {
    width: number;
    height: number;
    margins: {
      top: number;
      left: number;
      right: number;
      bottom: number;
    };
  };
};

const xAccessor = (d: DataProps) => d.value;
const yAccessor = (d: DataProps) => d.name;

export function Chart(props: ChartProps) {
  const { data, dimensions } = props;
  const { width, height, margins } = dimensions;

  const boundedWidth = width - margins.right - margins.left;
  const boundedHeight = height - margins.top - margins.bottom;

  const xScale = scaleLinear()
    .domain([0, max(data, xAccessor) as number])
    .nice()
    .range([0, boundedWidth]);

  const yScale = scaleBand()
    .domain(data.map(yAccessor))
    .range([boundedHeight, 0])
    .padding(0.2);

  const colorScale = scaleOrdinal<string>()
    .domain(data.map(yAccessor))
    .range(['#90CDF4', '#3182CE']);

  const bandWidth = yScale.bandwidth();

  const scaledX = (d: DataProps) => xScale(xAccessor(d));
  const scaledY = (d: DataProps) => yScale(yAccessor(d));

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <g transform={`translate(${margins.left}, ${margins.top})`}>
        {data.map((datum) => (
          <g
            key={yAccessor(datum)}
            transform={`translate(0, ${scaledY(datum)})`}
            fill={colorScale(yAccessor(datum))}
          >
            <rect height={bandWidth} width={scaledX(datum)} />
            <text
              fontWeight="bolder"
              dominantBaseline="hanging"
              transform={`translate(${scaledX(datum) + 6})`}
              fill="#4A5568"
            >
              {xAccessor(datum)}
              {datum.scale.substring(0, 1)}
            </text>
          </g>
        ))}
      </g>
      <BottomAxis
        margins={margins}
        boundedHeight={boundedHeight}
        xScale={xScale}
      />
      <LeftAxis margins={margins} yScale={yScale} />
    </svg>
  );
}
