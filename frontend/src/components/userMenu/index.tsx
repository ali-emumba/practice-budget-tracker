import React, { useState } from 'react';
import { Box, Divider, Typography, IconButton, Avatar } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './../../services/authServices';
import { logout } from './../../features/auth/authSlice';
import { useAppDispatch } from './../../app/hooks';

interface UserMenuProps {
  user?: {
    firstname?: string;
    lastname?: string; // Add last name if available
    email?: string;
    avatar?: string;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // Ensure the logout API call is awaited
      dispatch(logout()); // Dispatch the Redux logout action to clear state
      navigate('/login'); // Redirect the user to the login page after logout
    } catch (error: any) {
      console.error(error.message);
      // Optionally, handle or display the error to the user
    }
    setOpen(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton onClick={handleMenuToggle}>
        <Avatar alt={user?.firstname || 'U'} src={user?.avatar} />
      </IconButton>
      {open && (
        <Box
          sx={{
            position: 'absolute',
            top: 60, // Adjust according to the size of the navbar
            right: 0,
            width: 250, // Adjust width as needed
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 1,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              mb: 1,
            }}
          >
            <Avatar
              sx={{
                width: '42px',
                height: '42px',
                backgroundColor: 'rgba(239, 80, 128, 1)',
                mr: 2,
              }}
            >
              {user?.firstname?.charAt(0) || 'U'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {user?.firstname || 'User'} {user?.lastname || ''}
              </Typography>
              <Typography variant="body2">{user?.email || 'N/A'}</Typography>
            </Box>
          </Box>
          <Divider sx={{ width: '100%', mb: 1 }} />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                cursor: 'pointer',
              }}
              onClick={handleProfileClick}
            >
              <PeopleIcon sx={{ mr: 1, fontWeight: '300' }} />
              <Typography variant="body2">Profile</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                cursor: 'pointer',
              }}
              onClick={handleLogout}
            >
              <ExitToAppIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Logout</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserMenu;
