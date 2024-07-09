import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Avatar,
  Typography,
} from '@mui/material';

interface CoinOption {
  id: string;
  name: string;
  image: string;
  trending?: boolean;
}

interface SearchComponentProps {
  onSearch: (value: string) => void;
  dataOptions: CoinOption[];
  loading: boolean;
  onClickOption?: (option: CoinOption) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  dataOptions,
  loading,
  onClickOption,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<CoinOption[]>(dataOptions);
  const [focusedOption, setFocusedOption] = useState<CoinOption | null>(null);

  useEffect(() => {
    setOptions(dataOptions);
  }, [dataOptions]);

  useEffect(() => {
    onSearch(inputValue);
  }, [inputValue, onSearch]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const firstOption = options.find((option) =>
      option.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFocusedOption(firstOption || null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && focusedOption) {
      if (onClickOption) {
        onClickOption(focusedOption);
      }
      setInputValue('');
      setFocusedOption(null);
    }
  };

  return (
    <Autocomplete
      freeSolo
      autoSelect
      options={options}
      getOptionLabel={(option: CoinOption | string) => {
        if (typeof option === 'string') {
          return option;
        }
        return option.name || '';
      }}
      groupBy={(option) => (option.trending ? 'Trending' : '')}
      renderGroup={(params) => (
        <li key={params.key}>
          <Typography variant="subtitle1" sx={{ padding: 2 }}>
            {inputValue ? 'Coins' : 'Trending Coins'}
          </Typography>
          {params.children}
        </li>
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          onClick={() => onClickOption && onClickOption(option)}
        >
          <Avatar src={option.image} sx={{ marginRight: 2 }} />
          <Typography>{option.name}</Typography>
        </Box>
      )}
      inputValue={inputValue}
      loading={loading}
      onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
      onKeyDown={(event) => handleKeyDown(event)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Coins"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: <>{params.InputProps.endAdornment}</>,
          }}
        />
      )}
    />
  );
};

export default SearchComponent;
