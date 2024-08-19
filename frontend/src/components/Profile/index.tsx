import React from 'react';
import { Grid } from '@mui/material';
import UserProfileCard from './../userProfileCard';
import UserAboutMe from './../userAboutMe';
import UserPersonalDetails from './../userPersonalDetails';

const Profile: React.FC = () => {
  return (
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
  );
};

export default Profile;
