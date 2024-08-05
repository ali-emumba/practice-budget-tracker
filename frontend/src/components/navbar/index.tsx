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

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarExpanded: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  isSidebarExpanded,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
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
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar alt="User Name" src="/path/to/avatar.jpg" />
          </IconButton>

          {/* Dropdown Menu for User Actions */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
