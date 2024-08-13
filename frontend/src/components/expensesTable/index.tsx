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

interface ExpenseTableProps {
  expenses: Expense[];
  handleDelete: (expense: Expense) => void;
  totalExpenditure: number;
  setSelectedExpense: () => void;
  onOpen: () => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  setSelectedExpense,
  onOpen,
  handleDelete,
  totalExpenditure,
}) => {
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
            <TableCell sx={{ fontWeight: 'bold' }}>Expense Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Total Expenditure</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense, index) => {
            const progress = (expense.price / totalExpenditure) * 100;

            return (
              <TableRow key={index}>
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
                <TableCell>{getTimeAgo(expense.date)}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedExpense(expense);
                      onOpen();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(expense)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
