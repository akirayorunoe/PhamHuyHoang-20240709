import React, { useState, useMemo } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { LineChart, OHLCChart } from './Charts';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useOHLCData } from '../hooks/fetchers/useOHLCChart';
import { usePriceChartByRange } from '../hooks/fetchers/usePriceChartByRange';

const TabbarCoin = ({ coinId }: { coinId: string }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [days, setDays] = useState<number>(7);

  const filterOHLC = useMemo(
    () => ({
      vs_currency: 'usd',
      days: days.toString(),
    }),
    [days],
  );
  const { data: dataOHLC } = useOHLCData(coinId, filterOHLC);

  const filterPriceChart = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    return {
      vs_currency: 'usd',
      from: now - days * 24 * 60 * 60,
      to: now,
    };
  }, [days]);
  const { data: dataPriceChart } = usePriceChartByRange(
    coinId,
    filterPriceChart,
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleDaysChange = (event: SelectChangeEvent<number>) => {
    setDays(event.target.value as number);
  };

  return (
    <Container>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab icon={<ShowChartIcon />} label="Price Chart" />
        <Tab icon={<CandlestickChartIcon />} label="OHLC Chart" />
      </Tabs>
      <InputLabel>Days</InputLabel>
      <Select value={days} onChange={handleDaysChange}>
        <MenuItem value={7}>7 Days</MenuItem>
        <MenuItem value={14}>14 Days</MenuItem>
        <MenuItem value={30}>30 Days</MenuItem>
      </Select>
      <Box mt={3}>
        {selectedTab === 0 && dataPriceChart && (
          <LineChart data={dataPriceChart} />
        )}
        {selectedTab === 1 && dataOHLC && <OHLCChart data={dataOHLC} />}
      </Box>
    </Container>
  );
};

export default TabbarCoin;
