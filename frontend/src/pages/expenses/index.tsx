import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useAppSelector, useAppDispatch } from './../../app/hooks';
import {
  setExpenses,
  addExpense,
  editExpense as editExpenseAction,
  deleteExpense as deleteExpenseAction,
  Expense,
} from './../../features/expenses/expensesSlice';
import {
  getUserExpenses,
  addExpense as sendExpenseToBackend,
  editExpense as updateExpenseInBackend,
  deleteExpense as removeExpenseFromBackend,
} from './../../services/expenseServices';
import Header from './../../components/expensesHeader';
import FilterSection from './../../components/expensesFilterSection';
import ExpenseTable from './../../components/expensesTable';
import Pagination from './../../components/pagination';
import AddExpenseModal from './../../components/addExpenseModal';
import UpdateExpenseModal from './../../components/updateExpenseModal';
import dayjs from 'dayjs';

interface NewExpense {
  title: string;
  category: string;
  price: number;
  date: string;
}

const Expenses: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const expenses = useAppSelector((state) => state.expenses.expenses);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filter, setFilter] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [sortOrder, setSortOrder] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const fetchedExpenses = await getUserExpenses(accessToken);
        dispatch(setExpenses(fetchedExpenses));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [accessToken, dispatch]);

  const handleEdit = async (expense: Expense) => {
    console.log('expense', expense);
    try {
      const updatedExpense = await updateExpenseInBackend(
        expense._id,
        expense,
        accessToken
      );
      dispatch(editExpenseAction(updatedExpense));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (expense: Expense) => {
    try {
      await removeExpenseFromBackend(expense._id, accessToken);
      dispatch(deleteExpenseAction(expense._id));
      alert('Expense deleted successfully');
    } catch (err: any) {
      setError(err.message);
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

  const handleAddExpense = async (newExpense: NewExpense) => {
    try {
      const addedExpense = await sendExpenseToBackend(newExpense, accessToken);
      dispatch(addExpense(addedExpense));
      setModalOpen(false); // Close modal after successful addition
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const date = expense.date;
    const fd = dayjs(filterDate).format('DD/MM/YYYY');
    // console.log(fd, date);
    return (
      expense.title.toLowerCase().includes(filter.toLowerCase()) &&
      (fd === '' || date === fd)
    );
  });

  // Calculate the total expenditure for the month
  const totalExpenditure = expenses.reduce((acc, expense) => {
    const expenseMonth = dayjs(expense.date, 'DD/MM/YYYY').format('MM');
    const filterMonth = dayjs(filterDate).format('MM');
    console.log(
      'expenseMonth',
      expenseMonth,
      'filterMonth',
      filterMonth,
      'expense.date',
      expense.date
    );
    return expenseMonth === filterMonth ? acc + expense.price : acc;
  }, 0);

  console.log('totalExpenditure', totalExpenditure);

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

  const onAddExpenseClick = () => {
    setModalOpen(true);
  };

  const onUpdateExpenseClick = () => {
    setUpdateModalOpen(true);
  };

  const paginatedExpenses = sortedExpenses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // console.log('selectedExpense', selectedExpense);

  return (
    <Box sx={{ p: 1, backgroundColor: '#ECF1F2' }}>
      <Header onAddExpenseClick={onAddExpenseClick} />
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
            setSelectedExpense={setSelectedExpense}
            onOpen={onUpdateExpenseClick}
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
      <AddExpenseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddExpense={handleAddExpense}
      />
      <UpdateExpenseModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onUpdateExpense={handleEdit}
        initialExpense={selectedExpense}
      />
    </Box>
  );
};

export default Expenses;
