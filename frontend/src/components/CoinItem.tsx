import { Avatar, Typography, styled } from '@mui/material';
import { CoinsMarketData } from '../types/CoinsMarketData';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';

interface ICoinItem {
  item: CoinsMarketData;
  onClick?: (option: CoinsMarketData) => void;
}

const CoinItemWrapper = styled('div')({
  display: 'flex',
  fontWeight: 'bold',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease',
  width: 'fit-content',
  padding: 16,
  borderRadius: 16,
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    opacity:0.7,
    backgroundColor:'white'
  },
});

function CoinItem({ item, onClick }: ICoinItem) {
  const priceChange24h = item.price_change_percentage_24h.toFixed(2);
  return (
    <CoinItemWrapper
      onClick={() => {
        onClick && onClick(item);
      }}
    >
      <Avatar src={item.image} sx={{ marginRight: 2 }} />
      <div>
        <Typography fontWeight={'bold'}>{item.name}</Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            className={`${
              Number(priceChange24h) > 0 ? 'wrapper-green' : 'wrapper-red'
            }`}
          >
            {priceChange24h}%
          </div>
          <div>
            {Number(priceChange24h) > 0 ? (
              <TrendingUpRoundedIcon style={{ color: 'var(--green)' }} />
            ) : (
              <TrendingDownRoundedIcon style={{ color: 'var(--red)' }} />
            )}
          </div>
        </div>
      </div>
    </CoinItemWrapper>
  );
}

export default CoinItem;
