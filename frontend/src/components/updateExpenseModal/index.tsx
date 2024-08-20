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
    formState: { errors, isDirty },
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
      const formattedDate = dayjs(initialExpense.date, 'DD/MM/YYYY').format(
        'YYYY-MM-DD'
      );
      setValue('date', formattedDate);
    }
  }, [initialExpense, setValue]);

  const onSubmit = (data: NewExpense) => {
    console.log('data', data);
    console.log({ ...initialExpense!, ...data });
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                flex: 1,
                borderColor: 'gray',
                color: 'gray',
                '&:hover': {
                  borderColor: 'gray',
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
              disabled={!isDirty}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateExpenseModal;
