import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useAppSelector } from './../../app/hooks';

const UserPersonalDetails: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box>
      <Typography variant="h6" sx={{ backgroundColor: '#F7F7F7', p: 2 }}>
        Personal Details
      </Typography>
      <Grid
        container
        sx={{ backgroundColor: 'white', width: '100%', p: 2, fontSize: '14px' }}
      >
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 'bold' }}
          >
            Full Name:
          </Typography>
          <Typography variant="body1">{user?.fullName || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 'bold' }}
          >
            Father's Name:
          </Typography>
          <Typography variant="body1">{user?.fatherName || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 'bold' }}
          >
            Gender:
          </Typography>
          <Typography variant="body1">{user?.gender || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 'bold' }}
          >
            Phone:
          </Typography>
          <Typography variant="body1">{user?.phone || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 'bold' }}
          >
            Email:
          </Typography>
          <Typography variant="body1">{user?.email || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 'bold' }}
          >
            Zipcode:
          </Typography>
          <Typography variant="body1">{user?.zipcode || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 'bold' }}
          >
            Education:
          </Typography>
          <Typography variant="body1">{user?.education || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 'bold' }}
          >
            Date of Birth:
          </Typography>
          <Typography variant="body1">{user?.dob || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 'bold' }}
          >
            Address:
          </Typography>
          <Typography variant="body1">{user?.address || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 'bold' }}
          >
            Budget Limit:
          </Typography>
          <Typography variant="body1">{user?.budget || 'N/A'}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPersonalDetails;
