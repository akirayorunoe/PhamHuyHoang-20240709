import { useEffect, useMemo, useState } from 'react';
import { useCoinsList } from '../../hooks/fetchers/useCoinList';
import SearchComponent from '../../components/SearchInput';
import { useTrendingCoins } from '../../hooks/fetchers/useTrendingCoins';
import ListCoins from '../../components/ListCoins';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

interface CoinOption {
  id: string;
  name: string;
  image: string;
  trending?: boolean;
}

function HomePage() {
  const filters = useMemo(
    () => ({
      vs_currency: 'usd',
    }),
    [],
  );
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data, error, isLoading } = useCoinsList(filters);
  const { data: dataTrending, isLoading: isLoadingTrending } =
    useTrendingCoins();

  const [searchDataArray, setSearchDataArray] = useState<CoinOption[]>([]);

  useEffect(() => {
    if (!search) {
      setSearchDataArray(
        dataTrending?.coins?.map(({ item }) => ({
          id: item.id,
          name: item.name,
          image: item.thumb,
          trending: true,
        })) || [],
      );
    } else {
      setSearchDataArray(
        data.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          trending: false,
        })),
      );
    }
  }, [data, dataTrending?.coins, search]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <Header />
      <SearchComponent
        onSearch={setSearch}
        dataOptions={searchDataArray}
        loading={isLoadingTrending}
        onClickOption={(option) => navigate(`/coins/${option.id}`)}
      />
      <ListCoins data={data} loading={isLoading} error={error} />
    </div>
  );
}

export default HomePage;
