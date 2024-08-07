import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SignInForm from '../../components/signinForm';
import illustration from '../../assets/signin-illustration.png';

const SignIn = () => {
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
      {/* Sign In Form on the Left */}
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
          Welcome Back!
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ color: 'rgba(135, 138, 153, 1)' }}
        >
          Sign in to continue to Budget Tracker
        </Typography>

        <SignInForm />

        {/* Sign Up Link */}
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
          Don’t have an account?{' '}
          <Link
            to="/signup"
            style={{ color: 'primary.main', textDecoration: 'none' }}
          >
            Sign Up
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
          alt="Sign In Illustration"
          style={{ width: '80%', height: 'auto' }}
        />
      </Box>
    </Box>
  );
};

export default SignIn;
