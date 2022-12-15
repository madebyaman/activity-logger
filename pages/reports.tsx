import { Bar } from '../components/chart';

export default function Reports() {
  const labelsBarChart = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const dataBarChart = {
    labels: labelsBarChart,
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="py-3 px-5 bg-gray-50">Bar chart</div>
      <h1>Hello</h1>
      <Bar data={dataBarChart} />
    </div>
  );
}
