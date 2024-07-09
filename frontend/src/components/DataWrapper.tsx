import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface DataWrapperProps {
  isLoading: boolean;
  error: unknown;
  children: React.ReactNode;
}

const DataWrapper: React.FC<DataWrapperProps> = ({
  isLoading,
  error,
  children,
}) => {
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography color="error">
          Something went wrong: {String(error)}
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default DataWrapper;
