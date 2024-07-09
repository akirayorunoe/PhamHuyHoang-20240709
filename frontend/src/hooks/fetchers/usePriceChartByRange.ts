import { useEffect, useState } from 'react';
import { ListParams } from '../../types';
import coinsApi from '../../api/coinsApi';

export const usePriceChartByRange = (
  id: string,
  params: Partial<ListParams>,
) => {
  const [priceChartData, setPriceChartData] = useState<number[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    const fetchPriceChartDataAPI = async () => {
      try {
        setIsLoading(true);
        const { data } = await coinsApi.getPriceChartByRange(id, params);
        setPriceChartData(data.prices || []);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceChartDataAPI();
  }, [id, params]);

  return { data: priceChartData, isLoading: isLoading, error: error };
};
