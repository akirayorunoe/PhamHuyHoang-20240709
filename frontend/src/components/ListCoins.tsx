import React, { useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import DataWrapper from './DataWrapper';
import { CoinsMarketData } from '../types/CoinsMarketData';
import CoinItem from './CoinItem';
import { useNavigate } from 'react-router-dom';

interface IListCoins {
  data: CoinsMarketData[];
  loading: boolean;
  error: unknown;
}

const ListCoins: React.FC<IListCoins> = ({ data, loading, error }) => {
  const navigate = useNavigate();
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <DataWrapper error={error} isLoading={loading}>
      <Grid container spacing={2}>
        {currentData.map((item, index) => (
          <Grid key={index} item xs={6} md={4} xl={3}>
            <CoinItem
              item={item}
              onClick={(item) => navigate(`/coins/${item.id}`)}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        size="medium"
        siblingCount={1}
        boundaryCount={1}
        showFirstButton
        showLastButton
        sx={{ mt: 4, mx: 'auto', justifyContent: 'center', display: 'flex' }}
      />
    </DataWrapper>
  );
};

export default ListCoins;
