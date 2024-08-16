import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from './../../app/hooks';

const UserPersonalDetails: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="body2">
          <strong>Full Name:</strong> {user?.fullName || 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Father's Name:</strong> {user?.fatherName || 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Gender:</strong> {user?.gender || 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Phone:</strong> {user?.phone || 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Email:</strong> {user?.email || 'N/A'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2">
          <strong>Zipcode:</strong> {user?.zipcode || 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Education:</strong> {user?.education || 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Date of Birth:</strong> {user?.dob || 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Address:</strong> {user?.address || 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Budget Limit:</strong> {user?.budgetLimit || 'N/A'}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserPersonalDetails;
