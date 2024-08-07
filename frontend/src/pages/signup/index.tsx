import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SignUpForm from '../../components/signupForm';
import illustration from '../../assets/signup-illustration.png';

const SignUp = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
        px: { xs: 2, md: 6 },
      }}
    >
      {/* Sign Up Form on the Left */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: { xs: 2, md: 6 },
          width: { xs: '100%', md: '50%' },
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ color: 'rgba(135, 138, 153, 1)' }}
        >
          Welcome to our community
        </Typography>

        <SignUpForm />

        {/* Log In Link */}
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: '#2B2B2B',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          Already have an account?{' '}
          <Link
            to="/"
            style={{ color: 'primary.main', textDecoration: 'none' }}
          >
            Log In
          </Link>
        </Typography>
      </Box>

      {/* Illustration on the Right */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          borderLeft: { xs: 0, md: '1px solid rgba(135, 138, 153, 0.24)' },
        }}
      >
        <img
          src={illustration}
          alt="Sign Up Illustration"
          style={{ width: '80%', height: 'auto' }}
        />
      </Box>
    </Box>
  );
};

export default SignUp;
