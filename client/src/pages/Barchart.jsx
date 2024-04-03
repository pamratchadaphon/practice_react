import React from 'react';
import { Bar } from 'react-chartjs-2';

const Barchart = () => {
  // กำหนดข้อมูลและตัวเลือกของ Barchart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Income',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expense',
        data: [35, 49, 70, 41, 36, 25, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expense',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Barchart;
