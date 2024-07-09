import { useEffect, useState } from 'react';
import { CoinOHLCData, ListParams } from '../../types';
import coinsApi from '../../api/coinsApi';

export const useOHLCData = (id: string, params: Partial<ListParams>) => {
  const [OHLCData, setOHLCData] = useState<CoinOHLCData>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    const fetchOHLCDataAPI = async () => {
      try {
        setIsLoading(true);
        const { data } = await coinsApi.getCoinOHLC(id, params);
        setOHLCData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOHLCDataAPI();
  }, [id, params]);

  return { data: OHLCData, isLoading: isLoading, error: error };
};
