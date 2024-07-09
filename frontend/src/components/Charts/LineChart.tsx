import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
  data: number[][];
}

export const LineChart: React.FC<ChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
    },
    series: [
      {
        name: 'Price',
        data: data || [],
      },
    ],
    xaxis: {
      type: 'datetime',
    },
  };

  return (
    <Chart options={options} series={options.series} type="line" height={350} />
  );
};
