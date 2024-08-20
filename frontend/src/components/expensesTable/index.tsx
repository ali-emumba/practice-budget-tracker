import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { Expense } from './../../features/expenses/expensesSlice';
import { getFullFormattedDate } from './../../utils/utils';
import { useAppSelector } from './../../app/hooks';
import DeleteExpenseConfirmationModal from '../deleteExpenseConfirmationModal'; // Update the path as needed
import UpdateExpenseModal from '../updateExpenseModal';

interface ExpenseTableProps {
  expenses: Expense[];
  handleDelete: (expense: Expense) => void;
  handleEdit: (expense: Expense) => void;
  totalExpenditure: number;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  handleDelete,
  handleEdit,
  totalExpenditure,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedExpense, setSelectedExpenseLocal] = useState<Expense | null>(
    null
  );
  const [openUpdate, setOpenUpdate] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const handleDeleteClick = (expense: Expense) => {
    setSelectedExpenseLocal(expense);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedExpense) {
      handleDelete(selectedExpense);
      setSelectedExpenseLocal(null);
      setOpenConfirm(false);
    }
  };

  const handleUpdateClick = (expense: Expense) => {
    console.log('expense', expense);
    setSelectedExpenseLocal(expense);
    setOpenUpdate(true);
  };

  const expenseWithLessDetails = {
    title: selectedExpense?.title,
    price: selectedExpense?.price,
    date: selectedExpense?.date,
  };

  return (
    <Box>
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
              {user?.role === 'admin' && (
                <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>
              )}
              <TableCell sx={{ fontWeight: 'bold' }}>Expense Name</TableCell>

              <TableCell sx={{ fontWeight: 'bold' }}>
                Total Expenditure
              </TableCell>

              <TableCell sx={{ fontWeight: 'bold' }}>Price(PKR)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>

              <TableCell
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'right', // Right-align the icons column
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense, index) => {
              const progress = (expense.price / totalExpenditure) * 100;

              return (
                <TableRow key={index}>
                  {user?.role === 'admin' && (
                    <TableCell>
                      {expense.user?.firstname ? (
                        expense.user?.firstname
                      ) : (
                        <i style={{ color: 'gray' }}>user does not exist</i>
                      )}{' '}
                      {expense.user?.lastname}
                    </TableCell>
                  )}
                  <TableCell>{expense.title}</TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 5,
                          borderRadius: 15,
                          flexGrow: 1,
                          mr: 1,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: progress > 100 ? 'red' : '#7539FF',
                          },
                        }}
                      />
                      <Typography variant="body2">
                        {((expense.price / totalExpenditure) * 100).toFixed(2)}%
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{expense.price}</TableCell>
                  <TableCell>{getFullFormattedDate(expense.date)}</TableCell>

                  <TableCell
                    sx={{
                      textAlign: 'right', // Right-align the icons
                      '& .MuiIconButton-root': {
                        transition: 'none', // Remove default hover animation
                        '&:hover': {
                          backgroundColor: 'transparent', // Remove hover effect
                        },
                      },
                    }}
                  >
                    <IconButton
                      onClick={() => handleDeleteClick(expense)}
                      sx={{ p: 0 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="39"
                        height="19"
                        viewBox="0 0 9 19"
                        fill="none"
                      >
                        <path
                          d="M1 4.7947H2.59454M2.59454 4.7947H15.3509M2.59454 4.7947V15.9565C2.59454 16.3794 2.76253 16.7849 3.06157 17.084C3.3606 17.383 3.76618 17.551 4.18908 17.551H12.1618C12.5847 17.551 12.9902 17.383 13.2893 17.084C13.5883 16.7849 13.7563 16.3794 13.7563 15.9565V4.7947H2.59454ZM4.98635 4.7947V3.20016C4.98635 2.77726 5.15434 2.37168 5.45338 2.07265C5.75241 1.77362 6.15799 1.60562 6.58089 1.60562H9.76996C10.1929 1.60562 10.5984 1.77362 10.8975 2.07265C11.1965 2.37168 11.3645 2.77726 11.3645 3.20016V4.7947M6.58089 8.78105V13.5647M9.76996 8.78105V13.5647"
                          stroke="#FF5771"
                          strokeWidth="1.43509"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        // setSelectedExpense!(expense);
                        handleUpdateClick(expense);
                      }}
                      sx={{ p: 0 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="59"
                        height="19"
                        viewBox="0 0 59 19"
                        fill="none"
                      >
                        <path
                          d="M53.7579 2.40813C53.9673 2.19873 54.2159 2.03263 54.4895 1.9193C54.763 1.80598 55.0563 1.74765 55.3524 1.74765C55.6485 1.74765 55.9418 1.80598 56.2154 1.9193C56.489 2.03263 56.7376 2.19873 56.9469 2.40813C57.1563 2.61753 57.3225 2.86612 57.4358 3.13971C57.5491 3.4133 57.6074 3.70654 57.6074 4.00267C57.6074 4.2988 57.5491 4.59204 57.4358 4.86563C57.3225 5.13922 57.1563 5.38781 56.9469 5.59721L46.1838 16.3603L41.7988 17.5562L42.9947 13.1713L53.7579 2.40813Z"
                          stroke="#7539FF"
                          strokeWidth="1.43509"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteExpenseConfirmationModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        expense={expenseWithLessDetails} // Pass user information if needed
      />
      <UpdateExpenseModal
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        onUpdateExpense={handleEdit}
        initialExpense={selectedExpense}
      />
    </Box>
  );
};

export default ExpenseTable;
