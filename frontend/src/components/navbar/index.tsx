import React, { useState, MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAppSelector } from './../../app/hooks';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarExpanded: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  isSidebarExpanded,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  return (
    <AppBar
      position="absolute"
      color="secondary" // Use secondary color from the theme
      sx={{
        height: '90px',
        transition: 'width 0.3s',
        width: `calc(100% - ${isSidebarExpanded ? 306 : 91}px)`, // Adjust width based on sidebar state
        boxShadow: '2px 10px 60px 0px rgba(226, 236, 249, 0.50)', // Custom box shadow
        borderBottom: '1px solid #EEE', // Bottom border
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Hamburger Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSidebar} // Call toggleSidebar when clicked
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Notification Bell Icon */}
          <IconButton color="inherit" sx={{ marginRight: 2 }}>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          <IconButton color="primary" onClick={handleAvatarClick}>
            <Avatar alt={user ? user.firstname : 'U'} src={user?.avatar} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
