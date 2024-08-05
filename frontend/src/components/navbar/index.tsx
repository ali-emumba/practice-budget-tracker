import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static">
     <Tabs sx={{ flexGrow: 1 }}>
          <Tab sx={{ color: "whitesmoke" }} label="Home" component={Link} to="/" />
          <Tab sx={{ color: "whitesmoke" }} label="About" component={Link} to="/about" />
          <Tab sx={{ color: "whitesmoke" }} label="Test React Query" component={Link} to="/posts" />
          <Tab
          sx={{ color: "whitesmoke", marginLeft: "auto" }}
          label="Login"
          component={Link}
          to="/login"
          />
        </Tabs>
    </AppBar>
  );
}

