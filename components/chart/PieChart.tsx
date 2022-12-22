import { useState } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { Text } from '@visx/text';

export function PieChart({
  data,
  width,
}: {
  data: { label: string; minutes: number; color: string }[];
  width: number;
}) {
  const [activeItem, setActiveItem] = useState<typeof data[0] | null>(null);

  return (
    <svg viewBox={`0 0 ${width} ${width}`}>
      <Group top={width / 2} left={width / 2}>
        <Pie
          data={data}
          pieValue={(data) => data.minutes}
          outerRadius={width / 2}
          innerRadius={({ data }) => {
            const size =
              activeItem && activeItem.label === data.label ? 18 : 12;
            return width / 2 - size;
          }}
          padAngle={0.01}
        >
          {(pie) => {
            return pie.arcs.map((arc) => {
              return (
                <g
                  key={arc.data.label}
                  onMouseEnter={() => setActiveItem(arc.data)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <path
                    d={pie.path(arc) || undefined}
                    fill={arc.data.color}
                  ></path>
                </g>
              );
            });
          }}
        </Pie>
        {activeItem ? (
          <>
            <Text
              textAnchor="middle"
              fill={activeItem.color}
              fontSize={40}
              dy={-20}
            >
              {`${activeItem.minutes} Minutes`}
            </Text>
            <Text textAnchor="middle" fill={'#6b7280'} fontSize={20} dy={20}>
              {activeItem.label}
            </Text>
          </>
        ) : (
          <>
            <Text textAnchor="middle" fill="#1f2937" fontSize={40} dy={-20}>
              {`${data.reduce(
                (acc, initial) => acc + initial.minutes,
                0
              )} Minutes`}
            </Text>
            <Text textAnchor="middle" fill="#6b7280" fontSize={20} dy={20}>
              {`${data.length} Activities`}
            </Text>
          </>
        )}
      </Group>
    </svg>
  );
}
