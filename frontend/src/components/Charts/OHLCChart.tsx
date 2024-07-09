import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { CoinOHLCData } from '../../types';

interface ChartProps {
  data: CoinOHLCData;
}

export const OHLCChart: React.FC<ChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
    },
    series: [
      {
        name: 'OHLC',
        data:
          data?.map((d) => ({
            x: new Date(d![0]),
            y: [d![1], d![2], d![3], d![4]],
          })) || [],
      },
    ],
    xaxis: {
      type: 'datetime',
    },
  };

  return (
    <Chart
      options={options}
      series={options.series}
      type="candlestick"
      height={350}
    />
  );
};
