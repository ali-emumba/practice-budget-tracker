import React, { useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from './../../features/users/usersSlice';
import { userUpdateValidationSchema } from './../../validation/userUpdate.validation';

interface UpdateUserEditables {
  firstname: string;
  lastname: string;
  budget: number;
}

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
  const { control, handleSubmit, reset } = useForm<UpdateUserEditables>({
    resolver: yupResolver(userUpdateValidationSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      budget: 1,
    },
  });

  useEffect(() => {
    if (initialUser) {
      reset({
        firstname: initialUser.firstname,
        lastname: initialUser.lastname,
        budget: initialUser.budget,
      });
    }
  }, [initialUser, reset]);

  const onSubmit = (data: UpdateUserEditables) => {
    onUpdateUser({
      ...initialUser!,
      ...data,
      budget: Number(data.budget),
    });
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
            <Controller
              name="firstname"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="lastname"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
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
            <Controller
              name="budget"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Budget"
                  type="number"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
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
            onClick={handleSubmit(onSubmit)}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateUserModal;
