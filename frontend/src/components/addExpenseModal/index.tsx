import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { expenseValidationSchema } from './../../validation/expense.validation';

interface NewExpense {
  title: string;
  category: string;
  price: number;
  date: string;
}

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onAddExpense: (expense: NewExpense) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  open,
  onClose,
  onAddExpense,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<NewExpense>({
    resolver: yupResolver(expenseValidationSchema),
    defaultValues: {
      title: '',
      price: 1,
      category: '',
      date: new Date().toISOString().split('T')[0],
    },
    mode: 'onChange', // Ensure validation happens on field change
  });

  const handleAddExpense = (data: NewExpense) => {
    const newExpense: NewExpense = {
      ...data,
      price: Number(data.price),
    };

    onAddExpense(newExpense);
    reset(); // Clear form fields
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Add New Expense
        </Typography>
        <form onSubmit={handleSubmit(handleAddExpense)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category"
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              color="info"
              onClick={onClose}
              sx={{
                flex: 1,
                color: 'gray',
                borderColor: 'gray',
                '&:hover': {
                  color: 'black',
                  borderColor: 'black',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ flex: 1 }}
              disabled={!isDirty || !isValid}
            >
              Add Expense
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddExpenseModal;
