import { useNavigate, useParams } from 'react-router-dom';

import TabbarCoin from '../../components/TabbarCoin';
import { useMemo } from 'react';
import { useCoinsList } from '../../hooks/fetchers/useCoinList';
import CoinItem from '../../components/CoinItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

const CoinsDetail = () => {
  const { coinId = '' } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const filters = useMemo(
    () => ({
      vs_currency: 'usd',
    }),
    [],
  );
  const { data } = useCoinsList(filters);
  const foundCoin = data.find((i) => i.id === coinId);

  return foundCoin ? (
    <div>
      <IconButton onClick={() => navigate(`/`)}>
        <ArrowBackIcon />
      </IconButton>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CoinItem item={foundCoin} />
      </div>
      <TabbarCoin coinId={coinId} />
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      Something wrong, please try again
    </div>
  );
};

export default CoinsDetail;
