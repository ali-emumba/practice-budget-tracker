import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { toast } from 'react-toastify'; // Import toastify
import { getAllExpenses } from './../../services/adminServices'; // Ensure this service is created
import Header from './../../components/expensesHeader';
import FilterSection from './../../components/expensesFilterSection';
import ExpenseTable from './../../components/expensesTable';
import Pagination from './../../components/pagination';
import dayjs from 'dayjs';
import { Expense, setExpenses } from './../../features/expenses/expensesSlice';
import { useAppDispatch, useAppSelector } from './../../app/hooks';

const AdminExpenses: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filter, setFilter] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [sortOrder, setSortOrder] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const fetchedExpenses = await getAllExpenses(accessToken);
        dispatch(setExpenses(fetchedExpenses));
        // toast.success('Expenses fetched successfully!');
      } catch (err: any) {
        setError(err.message);
        toast.error(`Failed to fetch expenses: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [accessToken, dispatch]);

  const handleDelete = async (expense: Expense) => {
    try {
      // Implement delete functionality if needed
      toast.success('Expense deleted successfully!');
    } catch (err: any) {
      setError(err.message);
      toast.error(`Failed to delete expense: ${err.message}`);
    }
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

  const filteredExpenses =
    expenses &&
    expenses.filter((expense) => {
      const date = expense.date;
      const fd = dayjs(filterDate).format('DD/MM/YYYY');
      return (
        expense.title.toLowerCase().includes(filter.toLowerCase()) &&
        (fd === '' || date === fd)
      );
    });

  const totalExpenditure =
    expenses &&
    expenses.reduce((acc, expense) => {
      const expenseMonth = dayjs(expense.date, 'DD/MM/YYYY').format('MM');
      const filterMonth = dayjs(filterDate).format('MM');
      return expenseMonth === filterMonth ? acc + expense.price : acc;
    }, 0);

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
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <FilterSection
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            filter={filter}
            setFilter={setFilter}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
          />
          <ExpenseTable
            expenses={paginatedExpenses}
            handleDelete={handleDelete}
            totalExpenditure={totalExpenditure} // Pass totalExpenditure to the table
          />
          <Pagination
            count={filteredExpenses.length}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default AdminExpenses;
