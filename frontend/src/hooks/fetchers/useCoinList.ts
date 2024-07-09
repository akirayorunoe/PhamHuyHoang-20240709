import { useEffect, useState } from 'react';
import { ListParams } from '../../types';
import coinsApi from '../../api/coinsApi';
import { CoinsMarketData } from '../../types/CoinsMarketData';

export const useCoinsList = (params: Partial<ListParams>) => {
  const [coinsList, setCoinsList] = useState<CoinsMarketData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    const fetchCoinsListAPI = async () => {
      try {
        setIsLoading(true);
        const { data } = await coinsApi.getCoinsList(params);
        setCoinsList(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoinsListAPI();
  }, [params]);

  return { data: coinsList, isLoading: isLoading, error: error };
};
