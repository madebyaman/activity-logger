import Chart, { ChartTypeRegistry } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

type BarProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      data: number[];
    }[];
  };
};
export function DoughnutChart(props: BarProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const configBarChart = {
      type: 'doughnut' as keyof ChartTypeRegistry,
      data: props.data,
      options: {},
    };
    const chartBar = new Chart(chartRef.current, configBarChart);

    return () => chartBar.destroy();
  }, [props.data]);

  return (
    <canvas
      className="p-10"
      id="chartBar"
      data-testId="chartBar"
      ref={chartRef}
    ></canvas>
  );
}
