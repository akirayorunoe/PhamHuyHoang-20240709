import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoinsService } from './coins.service';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  // @Get('search')
  // searchCoin(@Query('query') query: string) {
  //   return this.coinsService.searchCoin(query);
  // }

  @Get('trending')
  getTrendingCoins() {
    return this.coinsService.getTrendingCoins();
  }

  @Get('price-chart-by-range/:id')
  getPriceChartByRange(
    @Param('id') id: string,
    @Query('vs_currency') vs_currency: string,
    @Query('from') from: number,
    @Query('to') to: number,
    @Query('precision') precision?: string,
  ) {
    return this.coinsService.getPriceChartByRange(id, {
      vs_currency,
      from,
      to,
      precision,
    });
  }

  @Get('get-ohlc-chart/:id')
  getCoinOHLC(
    @Param('id') id: string,
    @Query('vs_currency') vs_currency: string,
    @Query('days') days: string,
    @Query('precision') precision?: string,
  ) {
    return this.coinsService.getCoinOHLCChart(id, {
      vs_currency,
      days,
      precision,
    });
  }

  @Get('get-coins')
  getCoins(
    @Query('vs_currency') vs_currency: string,
    @Query('ids') ids?: string,
    @Query('category') category?: string,
    @Query('order') order?: string,
    @Query('per_page') per_page?: number,
    @Query('page') page?: number,
    @Query('sparkline') sparkline?: boolean,
    @Query('price_change_percentage') price_change_percentage?: string,
    @Query('locale') locale?: string,
    @Query('precision') precision?: string,
  ) {
    return this.coinsService.getCoinsList({
      vs_currency,
      ids,
      category,
      order,
      per_page,
      page,
      sparkline,
      price_change_percentage,
      locale,
      precision,
    });
  }
}
