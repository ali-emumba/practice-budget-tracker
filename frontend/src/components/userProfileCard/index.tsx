import React from 'react';
import { Box, Avatar, Typography, Divider, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import { User } from './../../features/users/usersSlice';
import { useAppSelector } from '../../app/hooks';

const UserProfileCard = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box
      sx={{
        p: 3,
        boxShadow: 1,
        borderRadius: '5px',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '425px',
          maxHeight: '405px',
          width: '100%',
          height: '100%',
          gap: 1,
          mb: 2,
        }}
      >
        <Avatar sx={{ width: 100, height: 100 }} src={user?.avatar} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{ fontSize: '16px', fontStyle: 'normal', fontWeight: 600 }}
          >{`${user?.firstname} ${user?.lastname}`}</Typography>
          <Typography variant="subtitle1" sx={{ color: '#9E9E9E' }}>
            {user?.jobTitle ? user.jobTitle : 'Product Manager'}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} sx={{ color: '#9E9E9E' }}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon sx={{ mr: 1 }} />
            <Typography variant="body2">
              {user?.phone ? user?.phone : '(084) 555-111222'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon sx={{ mr: 1 }} />
            <Typography variant="body2">
              {user?.email ? user?.email : 'testng@email.com'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography variant="body2">
              {user?.locationCity ? user.locationCity : 'New York'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageIcon sx={{ mr: 1 }} />
            <Typography variant="body2">
              {user?.website ? user?.website : 'www.netflix.com'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfileCard;
