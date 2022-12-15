import Chart, { ChartTypeRegistry } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

type BarProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      backgroundColor: string;
      borderColor: string;
      data: number[];
    }[];
  };
};
export function Bar(props: BarProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const configBarChart = {
      type: 'bar' as keyof ChartTypeRegistry,
      data: props.data,
      options: {},
    };
    const chartBar = new Chart(chartRef.current, configBarChart);

    return () => chartBar.destroy();
  }, [props.data]);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="py-3 px-5 bg-gray-50">Bar chart</div>
      <canvas className="p-10" id="chartBar" ref={chartRef}></canvas>
    </div>
  );
}
