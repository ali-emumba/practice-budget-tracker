import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from './../../app/hooks';
import { useNavigate } from 'react-router-dom';
import NotificationDropdown from './../../components/notficationDropdown'; // Update the path to where your NotificationDropdown is located

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarExpanded: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  isSidebarExpanded,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  return (
    <AppBar
      position="absolute"
      color="secondary"
      sx={{
        height: '90px',
        transition: 'width 0.3s',
        width: `calc(100% - ${isSidebarExpanded ? 306 : 91}px)`,
        boxShadow: '2px 10px 60px 0px rgba(226, 236, 249, 0.50)',
        borderBottom: '1px solid #EEE',
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
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NotificationDropdown />
          <IconButton color="primary" onClick={handleAvatarClick}>
            <Avatar alt={user ? user.firstname : 'U'} src={user?.avatar} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
