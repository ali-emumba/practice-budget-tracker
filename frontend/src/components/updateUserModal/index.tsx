import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { User } from './../../features/users/usersSlice';

interface UpdateUserModalProps {
  open: boolean;
  onClose: () => void;
  onUpdateUser: (user: User) => void;
  initialUser: User | null;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  open,
  onClose,
  onUpdateUser,
  initialUser,
}) => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [budget, setBudget] = useState<number | string>('');

  useEffect(() => {
    if (initialUser) {
      setFirstname(initialUser.firstname);
      setLastname(initialUser.lastname);
      setBudget(initialUser.budget);
    }
  }, [initialUser]);

  const handleUpdateUser = () => {
    if (!firstname || !lastname || !budget) {
      alert('Please fill out all fields');
      return;
    }

    const updatedUser: User = {
      ...initialUser!,
      firstname,
      lastname,
      budget: Number(budget),
    };

    onUpdateUser(updatedUser);
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
          Update User
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
        <TextField
          label="Email"
          value={initialUser?.email || ''}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Role"
          value={initialUser?.role || ''}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              label="Budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateUser}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateUserModal;
