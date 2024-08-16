import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

interface FilterSectionProps {
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filterDate: string;
  setFilterDate: React.Dispatch<React.SetStateAction<string>>;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  sortOrder,
  setSortOrder,
  filter,
  setFilter,
  filterDate,
  setFilterDate,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 2,
      p: 2,
      alignItems: { xs: 'start', md: 'center' },
      justifyContent: 'space-between',
      borderBottom: '1px solid #DDE4F0',
      backgroundColor: '#F7F7F7',
    }}
  >
    <Typography variant="h6" sx={{ mr: { md: 24 } }}>
      Expenses
    </Typography>

    <Box
      sx={{
        display: 'flex',
        gap: 4,
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as string)}
          label="Sort By"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="price-desc">Price - Highest to Lowest</MenuItem>
          <MenuItem value="price-asc">Price - Lowest to Highest</MenuItem>
          <MenuItem value="date-desc">Date - Newest to Oldest</MenuItem>
          <MenuItem value="date-asc">Date - Oldest to Newest</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Filter by Date"
        type="date"
        variant="outlined"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ minWidth: 150 }}
      />
      <TextField
        label="Keyword"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ width: 300 }}
      />{' '}
    </Box>
  </Box>
);

export default FilterSection;
