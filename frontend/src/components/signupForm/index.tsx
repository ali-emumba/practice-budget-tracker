import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { signUp } from './../../services/authServices';
import {
  signUpValidationSchema,
  SignUpFormData,
} from './../../validation/userRegister.validation';
import { toast } from 'react-toastify';

const SignUpForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpValidationSchema),
    mode: 'onChange', // Validate on every input change
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      budget: 1,
      avatar: undefined,
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);

    try {
      const response = await signUp({
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
        password: data.password,
        confirmPassword: data.confirmPassword,
        budget: data.budget,
        avatar: data.avatar?.[0], // Use the first file
      });

      if (response.success) {
        toast.success('Sign up successful!'); // Success message
        reset();
        navigate('/'); // Navigate to the home page on success
      } else {
        toast.error(response.message || 'Sign up failed. Please try again.'); // Error message
      }
    } catch (err: unknown | any) {
      toast.error(err.message || 'Sign up failed. Please try again.'); // Error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                disabled={loading}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                disabled={loading}
              />
            )}
          />
        </Box>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                {...field}
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                disabled={loading}
              />
              <Typography variant="caption" color="error">
                {errors.password?.message}
              </Typography>
            </FormControl>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                {...field}
                type={showConfirmPassword ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      edge="end"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                disabled={loading}
              />
              <Typography variant="caption" color="error">
                {errors.confirmPassword?.message}
              </Typography>
            </FormControl>
          )}
        />

        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Budget"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              error={!!errors.budget}
              helperText={errors.budget?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <TextField
              label="Avatar"
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                accept: 'image/jpeg, image/png',
              }}
              error={!!errors.avatar}
              helperText={(errors.avatar as any)?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const fileList = e.target.files;
                field.onChange(fileList);
              }}
              disabled={loading}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 1 }}
          disabled={!isValid || loading} // Disable the button if form is invalid or loading
        >
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
