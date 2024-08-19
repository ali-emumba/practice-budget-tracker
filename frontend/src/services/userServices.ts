import axios, { AxiosError } from 'axios';
import { axiosInstance } from './axiosInstance';
import {User} from './../features/users/usersSlice'


interface UpdateUserResponse {
  status: number;
  data: User;
  message: string;
}

export const updateUserDetails = async (data: User): Promise<User> => {
  try {
    const response = await axiosInstance.patch<UpdateUserResponse>(
      '/users/update-account', 
      data
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred while updating user details.'
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};


interface UpdateUserAvatarResponse {
  status: number;
  data: User;
  message: string;
}

// Function to update the user's avatar
export const updateUserAvatar = async (avatarFile: File): Promise<User> => {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    // Send the request to the server
    const response = await axiosInstance.patch<UpdateUserAvatarResponse>(
      '/users/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred while updating the avatar.'
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};