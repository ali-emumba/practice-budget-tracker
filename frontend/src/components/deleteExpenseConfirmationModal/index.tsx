import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface DeleteExpenseConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  expense: {
    title?: string;
    price?: number;
    date?: string;
  };
}

const DeleteExpenseConfirmationModal: React.FC<
  DeleteExpenseConfirmationModalProps
> = ({ open, onClose, onConfirm, expense }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ minHeight: '400px', p: 4 }}>
      <DialogTitle>Delete Expense</DialogTitle>
      <DialogContent sx={{ maxWidth: '460px', minWidth: '345px' }}>
        <Box>
          {/* Line 1 */}
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontSize: 14, fontWeight: 'bold' }}
            >
              Title
            </Typography>
          </Box>
          {/* Line 2 */}
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, color: 'text.secondary' }}
            >
              {expense.title}
            </Typography>
          </Box>
          {/* Line 3 */}
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}
            >
              Price(PKR)
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}
            >
              Date
            </Typography>
          </Box>
          {/* Line 6 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, color: 'text.secondary', flex: 1 }}
            >
              {expense.price}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, color: 'text.secondary', flex: 1 }}
            >
              {expense.date}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, display: 'flex', gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            flex: 1,
            borderColor: 'lightGray',
            color: 'gray',
            '&:hover': {
              borderColor: 'gray',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            flex: 1,
            backgroundColor: '#EF4435',
            color: 'white',
            '&:hover': {
              backgroundColor: '#D63027',
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteExpenseConfirmationModal;
