import { useEffect, useState } from 'react';
import { TrendingData } from '../../types';
import coinsApi from '../../api/coinsApi';

export const useTrendingCoins = () => {
  const [TrendingCoins, setTrendingCoins] = useState<TrendingData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    const fetchTrendingCoinsAPI = async () => {
      try {
        setIsLoading(true);
        const { data } = await coinsApi.getTrendingCoins();
        setTrendingCoins(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingCoinsAPI();
  }, []);

  return { data: TrendingCoins, isLoading: isLoading, error: error };
};
