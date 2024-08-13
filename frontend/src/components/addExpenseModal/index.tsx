import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import dayjs from 'dayjs';

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
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const handleAddExpense = () => {
    if (!title || !price || !category || !date) {
      alert('Please fill out all fields');
      return;
    }

    const newExpense: NewExpense = {
      title,
      price: Number(price),
      category,
      date,
    };

    console.log(dayjs(date).format('DD/MM/YYYY'));
    onAddExpense(newExpense);

    // Clear fields after adding the expense
    setTitle('');
    setPrice('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);

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
          onChange={(e) => setCategory(e.target.value as string)}
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
            onClick={handleAddExpense}
          >
            Add Expense
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddExpenseModal;
