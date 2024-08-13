import React, { useState } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';

interface HeaderProps {
  onAddExpenseClick: () => void;
}

const Header = ({ onAddExpenseClick }: HeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: {
            xs: '1.25rem',
            sm: '1.5rem',
            md: '2rem',
            lg: '2.125rem',
          },
        }}
      >
        Expenses
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onAddExpenseClick()}
        sx={{
          fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
          padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' },
        }}
      >
        Add Expense
      </Button>
    </Box>
  );
};

export default Header;
