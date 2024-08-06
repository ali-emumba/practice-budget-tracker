import React, { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  LinearProgress,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Expense {
  name: string;
  totalExpenditure: number;
  price: number;
  date: string;
}

const Home = () => {
  // Define more dummy data within the component
  const [expenses] = useState<Expense[]>([
    { name: 'Groceries', totalExpenditure: 200, price: 50, date: '2024-08-01' },
    { name: 'Utilities', totalExpenditure: 300, price: 75, date: '2024-08-05' },
    { name: 'Rent', totalExpenditure: 1000, price: 500, date: '2024-08-10' },
    {
      name: 'Entertainment',
      totalExpenditure: 150,
      price: 40,
      date: '2024-08-15',
    },
    {
      name: 'Transportation',
      totalExpenditure: 250,
      price: 60,
      date: '2024-08-15',
    },
    {
      name: 'Dining Out',
      totalExpenditure: 100,
      price: 30,
      date: '2024-08-15',
    },
    { name: 'Medical', totalExpenditure: 200, price: 120, date: '2024-08-30' },
    {
      name: 'Education',
      totalExpenditure: 500,
      price: 200,
      date: '2024-08-15',
    },
  ]);

  const totalBudget = 3000; // Example total budget

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split('T')[0]
  ); // Default to current date
  const [sortOrder, setSortOrder] = useState('');

  const handleEdit = (expense: Expense) => {
    console.log('Edit:', expense);
  };

  const handleDelete = (expense: Expense) => {
    console.log('Delete:', expense);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter by keyword and date
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.name.toLowerCase().includes(filter.toLowerCase()) &&
      (filterDate === '' || expense.date === filterDate)
  );

  // Sort expenses based on selected sort order
  const sortedExpenses = filteredExpenses.sort((a, b) => {
    switch (sortOrder) {
      case 'price-desc':
        return b.price - a.price;
      case 'price-asc':
        return a.price - b.price;
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      default:
        return 0;
    }
  });

  const paginatedExpenses = sortedExpenses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 1, backgroundColor: '#ECF1F2' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
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
            }, // Responsive font sizes
          }}
        >
          Expenses
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
            padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' },
          }}
        >
          Add Expense
        </Button>
      </Box>

      {/* Horizontal Divider */}
      <Divider sx={{ mb: 2 }} />

      {/* Filter Section */}
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
          Expenses
        </Typography>

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
          sx={{ minWidth: 200, flexGrow: 1 }}
        />
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          overflowX: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          boxShadow: 1,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Expense Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Total Expenditure
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedExpenses.map((expense, index) => {
              const progress = (expense.totalExpenditure / totalBudget) * 100;

              return (
                <TableRow key={index}>
                  <TableCell>{expense.name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 5,
                          borderRadius: 15,
                          width: '100%',
                          mr: 1,
                        }}
                      />
                      {`${progress.toFixed(1)}%`}
                    </Box>
                  </TableCell>
                  <TableCell>${expense.price.toFixed(2)}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(expense)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(expense)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={sortedExpenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Home;
