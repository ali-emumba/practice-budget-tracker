import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from './../../app/hooks';

const UserAboutMe: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box sx={{ borderRadius: '5px' }}>
      <Typography variant="h6" sx={{ backgroundColor: '#F7F7F7 ', p: 2 }}>
        About Me
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#9E9E9E',
          backgroundColor: 'white',
          p: 2,

          fontSize: '14px',
        }}
      >
        {user?.aboutMe ||
          'Passionate UI/UX designer with over 5 years of experience in creating user-friendly and visually appealing digital experiences. Skilled in wireframing, prototyping, and user research to deliver intuitive designs. Committed to enhancing user satisfaction through innovative and effective design solutions.'}
      </Typography>
    </Box>
  );
};

export default UserAboutMe;
