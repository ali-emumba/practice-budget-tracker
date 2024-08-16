import React from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Expense } from './../../features/expenses/expensesSlice';
import { getTimeAgo } from './../../utils/utils';
import { useAppSelector } from './../../app/hooks';

interface ExpenseTableProps {
  expenses: Expense[];
  handleDelete: (expense: Expense) => void;
  totalExpenditure: number;
  setSelectedExpense?: (selectedExpense: Expense) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  setSelectedExpense,
  handleDelete,
  totalExpenditure,
}) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
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
            {user?.role === 'user' && (
              <TableCell sx={{ fontWeight: 'bold' }}>
                Total Expenditure
              </TableCell>
            )}
            <TableCell sx={{ fontWeight: 'bold' }}>Price(PKR)</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
            {user?.role === 'user' && (
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense, index) => {
            const progress = (expense.price / totalExpenditure) * 100;

            return (
              <TableRow key={index}>
                {user?.role === 'admin' && (
                  <TableCell>
                    {expense.user?.firstname ? expense.user?.firstname : '-'}{' '}
                    {expense.user?.lastname}
                  </TableCell>
                )}
                <TableCell>{expense.title}</TableCell>
                {user?.role === 'user' && (
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
                )}
                <TableCell>{expense.price}</TableCell>
                <TableCell>{getTimeAgo(expense.date)}</TableCell>
                {user?.role === 'user' && (
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setSelectedExpense!(expense);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(expense)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
