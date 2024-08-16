import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import UserProfileCard from './../../components/userProfileCard';
import UserAboutMe from './../../components/userAboutMe';
import UserPersonalDetails from './../../components/userPersonalDetails';

const ProfilePage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Profile
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <UserProfileCard />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <UserAboutMe />
            </Grid>
            <Grid item>
              <UserPersonalDetails />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
