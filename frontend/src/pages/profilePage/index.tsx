import React, { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import Profile from './../../components/Profile';
import MyAccount from './../../components/myAccount';

const ProfilePage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'profile' | 'myAccount'>(
    'profile'
  );

  const handleOptionChange = (option: 'profile' | 'myAccount') => {
    setSelectedOption(option);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Profile</Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography
            sx={{
              cursor: 'pointer',
              borderBottom:
                selectedOption === 'profile' ? '2px solid purple' : 'none',
              color: selectedOption === 'profile' ? 'purple' : 'inherit',
            }}
            onClick={() => handleOptionChange('profile')}
          >
            Profile
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
              borderBottom:
                selectedOption === 'myAccount' ? '2px solid purple' : 'none',
              color: selectedOption === 'myAccount' ? 'purple' : 'inherit',
            }}
            onClick={() => handleOptionChange('myAccount')}
          >
            My Account
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      {selectedOption === 'profile' ? <Profile /> : <MyAccount />}
    </Box>
  );
};

export default ProfilePage;
