import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from './../../features/auth/authSlice'; // Adjust the path as necessary
import { loginUser } from './../../services/authServices'; // Adjust the path as necessary
import { useAppDispatch } from './../../app/hooks';
import { useNavigate } from 'react-router-dom';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { accessToken, refreshToken, user } = await loginUser(
        email,
        password
      );

      console.log('form data', accessToken, refreshToken, user);
      // Dispatch login action to Redux store
      dispatch(login({ accessToken, refreshToken, user }));

      // Optionally redirect the user to another page
      if (user.role === 'admin') {
        navigate('/admin/expenses');
        return;
      }
      navigate('/expenses');
    } catch (error: unknown | any) {
      console.error(
        'Login failed:',
        error.response?.data?.message || error.message
      );
      // Handle error (e.g., show notification)
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Log In
        </Button>
      </form>
    </Box>
  );
};

export default SignInForm;
