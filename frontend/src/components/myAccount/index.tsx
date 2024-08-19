import React, { useState, useEffect } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserProfileCard from './../userProfileCard';
import MyAccountDetails from './../myAccountDetails';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  updateUserDetails,
  updateUserAvatar,
} from './../../services/userServices'; // import your API functions
import { setUserState } from './../../features/auth/authSlice'; // import your setUserState reducer
import { toast } from 'react-toastify'; // import React Toastify for notifications

const MyAccount: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    jobTitle: user?.jobTitle || '',
    streetAddress: user?.streetAddress || '',
    locationCity: user?.locationCity || '',
    state: user?.state || '',
    zipcode: user?.zipcode || '',
    address: user?.address || '',
    phone: user?.phone || '',
    email: user?.email || '',
    dob: user?.dob || '',
    education: user?.education || '',
    gender: user?.gender || '',
    budget: user?.budget || '',
    avatar: user?.avatar || '',
  });

  const [updatedAvatar, setUpdatedAvatar] = useState<File | null>(null); // Track updated avatar
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const isFormChanged = Object.keys(formData).some(
      (key) =>
        formData[key as keyof typeof formData] !==
        user?.[key as keyof typeof user]
    );
    setIsUpdated(isFormChanged || !!updatedAvatar); // Enable button if form or avatar is changed
  }, [formData, user, updatedAvatar]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarChange = (file: File | null) => {
    setUpdatedAvatar(file);
  };

  const handleUpdate = async () => {
    try {
      const updatedUserData = new FormData();
      Object.keys(formData).forEach((key) => {
        updatedUserData.append(key, formData[key as keyof typeof formData]);
      });

      // Call updateUserAvatar if an avatar was selected
      if (updatedAvatar) {
        await updateUserAvatar(updatedAvatar);
      }

      const updatedUser = await updateUserDetails(updatedUserData);
      dispatch(setUserState(updatedUser)); // Update the user in the Redux store
      toast.success('User details updated successfully!'); // Show success notification
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user details.'); // Show error notification
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <UserProfileCard
            isPictureUpdatable
            onAvatarChange={handleAvatarChange} // Pass callback to handle avatar changes
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <MyAccountDetails
            formData={formData}
            onInputChange={handleInputChange}
          />
          <Box
            sx={{
              backgroundColor: 'white',
              display: 'flex',
              p: 2,
              borderRadius: '5px',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              onClick={handleUpdate}
              disabled={!isUpdated} // disable if no changes are made
            >
              Update
            </Button>
            <Button
              sx={{ backgroundColor: 'transparent', color: 'black' }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyAccount;
