import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

interface UserTableFilterSectionProps {
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const UserTableFilterSection: React.FC<UserTableFilterSectionProps> = ({
  sortOrder,
  setSortOrder,
  filter,
  setFilter,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 2,
      p: 2,
      alignItems: { xs: 'start', md: 'center' },
      borderBottom: '1px solid #DDE4F0',
      backgroundColor: '#F7F7F7',
    }}
  >
    <Typography variant="h6" sx={{ mr: { md: 24 } }}>
      Users
    </Typography>
    <FormControl variant="outlined" sx={{ minWidth: 200 }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as string)}
        label="Sort By"
      >
        <MenuItem value="name-asc">Name - A to Z</MenuItem>
        <MenuItem value="name-desc">Name - Z to A</MenuItem>
      </Select>
    </FormControl>

    <TextField
      label="Keyword"
      variant="outlined"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      sx={{ minWidth: 200, flexGrow: 1 }}
    />
  </Box>
);

export default UserTableFilterSection;
