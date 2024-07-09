import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { TrendingData, PriceChartByRangeData, CoinOHLCData } from './types';
import { createQueryString } from 'src/common';
import { CoinsMarketData } from './types/CoinsMarketData';

@Injectable()
export class CoinsService {
  private readonly API_URL = 'https://api.coingecko.com/api/v3';

  constructor(private readonly httpService: HttpService) {}

  getTrendingCoins() {
    return this.httpService
      .get(`${this.API_URL}/search/trending`)
      .pipe(map((response: { data: TrendingData }) => response.data));
  }

  getPriceChartByRange(
    id: string,
    query: {
      vs_currency: string;
      from: number;
      to: number;
      precision?: string;
    },
  ) {
    const queryString = createQueryString(query);
    return this.httpService
      .get(`${this.API_URL}/coins/${id}/market_chart/range?${queryString}`)
      .pipe(map((response: { data: PriceChartByRangeData }) => response.data));
  }

  getCoinOHLCChart(
    id: string,
    query: {
      vs_currency: string;
      days: string;
      precision?: string;
    },
  ) {
    const queryString = createQueryString(query);
    return this.httpService
      .get(`${this.API_URL}/coins/${id}/ohlc?${queryString}`)
      .pipe(map((response: { data: CoinOHLCData }) => response.data));
  }

  getCoinsList(query: {
    vs_currency: string;
    ids?: string;
    category?: string;
    order?: string;
    per_page?: number;
    page?: number;
    sparkline?: boolean;
    price_change_percentage?: string;
    locale?: string;
    precision?: string;
  }) {
    const queryString = createQueryString(query);
    return this.httpService
      .get(`${this.API_URL}/coins/markets?${queryString}`)
      .pipe(map((response: { data: CoinsMarketData[] }) => response.data));
  }
}
