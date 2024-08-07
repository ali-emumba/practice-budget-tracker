import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { Box, Toolbar } from '@mui/material';

export default function RooLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Sidebar expanded={isSidebarExpanded} />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarExpanded={isSidebarExpanded}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            transition: 'margin-left 0.3s',
            marginTop: '90px', // Adjusting for navbar height
            overflow: 'hidden', // Ensure no content overflow
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
