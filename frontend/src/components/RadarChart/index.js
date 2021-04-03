import React from 'react';
import { Radar } from 'react-chartjs-2';

const data = {
  labels: [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: 'Total Spending',
      data: [
        10000.0,
        12670.0,
        14006.0,
        35000.0,
        5000.0,
        45000.0,
        21000.0,
        18400.0,
        17450.0,
        15000.0,
        19670.0,
        34654.0,
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scale: {
    ticks: { beginAlZero: true },
  },
};

const RadarChart = () => {
  return (
    <div style={{ width: '800px' }}>
      <Radar data={data} options={options}/>
    </div>
  );
};

export default RadarChart;
