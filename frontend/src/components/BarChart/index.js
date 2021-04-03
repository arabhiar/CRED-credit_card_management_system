import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
  const { color } = props;

  const data = {
    labels: ['Amazon', 'Flipkart', 'Netmeds', 'Swiggy', 'Zomato', 'Myntra'],
    datasets: [
      {
        label: '# of Votes',
        data: [1200.0, 1900.0, 2700.0, 250.0, 520.0, 3000.0],
        backgroundColor: color.background,
        borderColor: color.border,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '800px' }}>
      <Bar
        data={data}
        height={400}
        width={800}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default BarChart;
