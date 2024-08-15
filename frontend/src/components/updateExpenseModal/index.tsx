import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import dayjs from 'dayjs';

interface Expense {
  _id: string;
  title: string;
  category: string;
  price: number;
  date: string;
  user: string;
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
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    if (initialExpense) {
      setTitle(initialExpense.title);
      setPrice(initialExpense.price);
      setCategory(initialExpense.category);
      setDate(dayjs(initialExpense.date).format('YYYY-MM-DD'));
    }
  }, [initialExpense]);

  const handleUpdateExpense = () => {
    if (!title || !price || !category || !date) {
      alert('Please fill out all fields');
      return;
    }

    const updatedExpense: Expense = {
      ...initialExpense!,
      title,
      price: Number(price),
      category,
      date,
    };

    onUpdateExpense(updatedExpense);

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
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateExpense}
          >
            Update Expense
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateExpenseModal;
