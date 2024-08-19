import React from 'react';
import { Box, Divider, Grid, TextField, Typography } from '@mui/material';

interface MyAccountDetailsProps {
  formData: {
    firstname: string;
    lastname: string;
    jobTitle: string;
    streetAddress: string;
    locationCity: string;
    state: string;
    zipcode: string;
    address: string;
    phone: string;
    email: string;
    dob: string;
    education: string;
    gender: string;
    budget: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyAccountDetails: React.FC<MyAccountDetailsProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <Box sx={{ boxShadow: 1, borderRadius: '5px' }}>
      <Typography variant="h6" sx={{ backgroundColor: '#F7F7F7', p: 2 }}>
        My Account
      </Typography>
      <Box sx={{ backgroundColor: 'white', p: 3 }}>
        {/* Section 1: Name & Job */}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Name & Job
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              name="firstname"
              value={formData.firstname}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              name="lastname"
              value={formData.lastname}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Job Title"
              variant="outlined"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Section 2: Address */}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Street Address"
              variant="outlined"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              name="locationCity"
              value={formData.locationCity}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="State"
              variant="outlined"
              name="state"
              value={formData.state}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Zip Code"
              variant="outlined"
              name="zipcode"
              value={formData.zipcode}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Complete Address"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Section 3: Contact Info */}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Contact Info
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Section 4: Bio */}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Bio
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Date Of Birth"
              variant="outlined"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Education"
              variant="outlined"
              name="education"
              value={formData.education}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Gender"
              variant="outlined"
              name="gender"
              value={formData.gender}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Budget"
              variant="outlined"
              name="budget"
              value={formData.budget}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MyAccountDetails;
