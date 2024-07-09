import queryString from 'query-string';
import {
  CoinOHLCData,
  ListParams,
  PriceChartByRangeData,
  TrendingData,
} from '../types';
import axiosClient from './axiosClient';
import { CoinsMarketData } from '../types/CoinsMarketData';

const coinsApi = {
  getCoinsList: (params: Partial<ListParams>) => {
    const response = axiosClient.get<CoinsMarketData[]>(
      `/get-coins?${queryString.stringify(params)}`,
    );
    return response;
  },

  getTrendingCoins: () => {
    const response = axiosClient.get<TrendingData>(`/trending`);
    return response;
  },

  // searchCoins: (params: Partial<ListParams>) => {
  //   const response = axiosClient.get<SearchCoinData>(
  //     `/search?${queryString.stringify(params)}`,
  //   );
  //   return response;
  // },

  getPriceChartByRange: (id: string, params: Partial<ListParams>) => {
    const response = axiosClient.get<PriceChartByRangeData>(
      `/price-chart-by-range/${id}?${queryString.stringify(params)}`,
    );
    return response;
  },

  getCoinOHLC: (id: string, params: Partial<ListParams>) => {
    const response = axiosClient.get<CoinOHLCData>(
      `/get-ohlc-chart/${id}?${queryString.stringify(params)}`,
    );
    return response;
  },
};

export default coinsApi;
