import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import logo from './../../assets/logo.png'; // Update with your logo path
import { logoutUser } from './../../services/authServices';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { logout } from './../../features/auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  expanded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded }) => {
  const [selectedItem, setSelectedItem] = useState<string>(''); // State to track the selected item
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);

  // Define the styles for the selected item
  const selectedStyle = {
    backgroundColor: 'primary.main', // Use primary color from the theme
    color: 'white', // White text for better contrast
    borderRadius: '5px', // Rounded corners for the selected item
    mx: 2, // Add horizontal margin
    '& .MuiListItemIcon-root': {
      color: 'white', // White icon color
    },
  };

  // Function to handle item selection and navigation
  const handleItemClick = (item: string, path: string) => {
    setSelectedItem(item);
    navigate(path);
  };

  // Update selected item based on the current URL
  useEffect(() => {
    if (
      location.pathname === '/expenses' ||
      location.pathname === 'admin/expenses'
    ) {
      setSelectedItem('Expenses');
    } else if (
      location.pathname === '/reporting' ||
      location.pathname === '/admin/reporting'
    ) {
      setSelectedItem('Analysis');
    } else if (location.pathname === '/admin/users') {
      setSelectedItem('Users');
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser(accessToken); // Ensure the logout API call is awaited
      dispatch(logout()); // Dispatch the Redux logout action to clear state
      navigate('/login'); // Redirect the user to the login page after logout
    } catch (error: any) {
      console.error(error.message);
      // Optionally, handle or display the error to the user
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: expanded ? 306 : 91,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: expanded ? 306 : 91,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <List
        sx={{
          width: '100%',
          p: 0,
          color: '#878A99',
        }}
      >
        {/* Company Logo and Title */}
        <ListItem
          sx={{
            height: '90px',
            borderBottom: '1px solid lightGray',
            borderRight: '1px solid lightGray',
            justifyContent: expanded ? 'flex-start' : 'center', // Adjust alignment based on expanded state
            paddingLeft: expanded ? 2 : 0, // Add padding when expanded
          }}
        >
          <img src={logo} alt="Company Logo" style={{ height: '34px' }} />
          {expanded && (
            <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
              Budget Tracker
            </Typography>
          )}
        </ListItem>

        {/* Sidebar Items */}
        <ListItem
          button
          disableRipple
          sx={{
            mt: 2, // Add margin-top for top-side gap
            ml: 2,
            mr: 2, // Add margin-right for right-side gap
            ...(selectedItem === 'Analysis' ? selectedStyle : {}),
            '&:hover': { backgroundColor: 'transparent' }, // Disable hover effect
            '&:focus': { outline: 'none' }, // Disable focus effect
          }}
          onClick={
            user?.role === 'user'
              ? () => handleItemClick('Analysis', '/reporting')
              : () => handleItemClick('Analysis', '/admin/reporting')
          }
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Analysis" />}
        </ListItem>

        <ListItem
          button
          disableRipple
          sx={{
            mt: 2, // Add margin-top for top-side gap
            ml: 2,
            mr: 2, // Add margin-right for right-side gap
            ...(selectedItem === 'Expenses' ? selectedStyle : {}),
            '&:hover': { backgroundColor: 'transparent' }, // Disable hover effect
            '&:focus': { outline: 'none' }, // Disable focus effect
          }}
          onClick={
            user?.role === 'user'
              ? () => handleItemClick('Expenses', '/expenses')
              : () => handleItemClick('Expenses', '/admin/expenses')
          }
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Expenses" />}
        </ListItem>

        {user?.role === 'admin' && (
          <ListItem
            button
            disableRipple
            sx={{
              mt: 2, // Add margin-top for top-side gap
              ml: 2,
              mr: 2, // Add margin-right for right-side gap
              ...(selectedItem === 'Users' ? selectedStyle : {}),
              '&:hover': { backgroundColor: 'transparent' }, // Disable hover effect
              '&:focus': { outline: 'none' }, // Disable focus effect
            }}
            onClick={() => handleItemClick('Users', '/admin/users')}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Users" />}
          </ListItem>
        )}

        <ListItem
          button
          disableRipple
          sx={{
            mt: 2, // Add margin-top for top-side gap
            ml: 2,
            mr: 2, // Add margin-right for right-side gap
            ...(selectedItem === 'Logout' ? selectedStyle : {}),
            '&:hover': { backgroundColor: 'transparent' }, // Disable hover effect
            '&:focus': { outline: 'none', backgroundColor: 'transparent' }, // Disable focus effect
          }}
          onClick={handleLogout} // Call handleLogout on click
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Logout" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
