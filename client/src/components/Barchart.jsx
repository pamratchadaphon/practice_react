import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ chartData }) => {
  return (
    <div>
      <h2>แผนภูมิแท่ง</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;


