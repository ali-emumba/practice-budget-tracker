// src/components/UpdateExpenseModal.tsx
import React, { useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { expenseValidationSchema } from './../../validation/expense.validation';
import dayjs from 'dayjs';
import { Expense } from './../../features/expenses/expensesSlice';

interface NewExpense {
  title: string;
  category: string;
  price: number;
  date: string;
}

interface UpdateExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onUpdateExpense: (expense: Expense) => void;
  initialExpense: Expense | null;
}

const UpdateExpenseModal: React.FC<UpdateExpenseModalProps> = ({
  open,
  onClose,
  onUpdateExpense,
  initialExpense,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewExpense>({
    resolver: yupResolver(expenseValidationSchema),
    defaultValues: {
      title: '',
      category: '',
      price: 0,
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (initialExpense) {
      setValue('title', initialExpense.title);
      setValue('price', initialExpense.price);
      setValue('category', initialExpense.category);
      setValue('date', dayjs(initialExpense.date).format('YYYY-MM-DD'));
    }
  }, [initialExpense, setValue]);

  const onSubmit = (data: NewExpense) => {
    onUpdateExpense({ ...initialExpense!, ...data });
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
          Update Expense
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="info" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateExpenseModal;
