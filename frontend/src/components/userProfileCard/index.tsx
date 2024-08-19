import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Grid,
  IconButton,
  Input,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../app/hooks';

interface UserProfileCardProps {
  isPictureUpdatable?: boolean;
  onAvatarChange?: (avatar: File | null) => void; // Callback to notify parent
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  isPictureUpdatable = false,
  onAvatarChange,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [hover, setHover] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
      if (onAvatarChange) onAvatarChange(file); // Notify parent about the new avatar
    }
  };

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
        <Box
          sx={{ position: 'relative', width: 100, height: 100 }}
          onMouseEnter={() => isPictureUpdatable && setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Avatar sx={{ width: '100%', height: '100%' }} src={avatar} />
          {isPictureUpdatable && hover && (
            <IconButton
              component="label"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                borderRadius: '50%',
              }}
            >
              <EditIcon />
              <Input
                type="file"
                onChange={handleAvatarChange}
                sx={{ display: 'none' }}
              />
            </IconButton>
          )}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{ fontSize: '16px', fontStyle: 'normal', fontWeight: 600 }}
          >
            {`${user?.firstname || 'N/A'} ${user?.lastname || 'N/A'}`}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#9E9E9E' }}>
            {user?.jobTitle || 'N/A'}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} sx={{ color: '#9E9E9E' }}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon sx={{ mr: 1 }} />
            <Typography variant="body2">{user?.phone || 'N/A'}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon sx={{ mr: 1 }} />
            <Typography variant="body2">{user?.email || 'N/A'}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography variant="body2">
              {user?.locationCity || 'N/A'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageIcon sx={{ mr: 1 }} />
            <Typography variant="body2">{user?.website || 'N/A'}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfileCard;
