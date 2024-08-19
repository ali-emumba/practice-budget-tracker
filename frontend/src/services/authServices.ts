import axios from 'axios';
import { axiosInstance } from './axiosInstance';

enum UserRoles {
    admin = 'admin',
    user = 'user',
  }
interface LoginResponse {
    data: {
        accessToken: string;
        refreshToken: string;
        user: {
          email: string;
          _id: string;
          firstname: string;
          lastname: string;
          avatar: string;
          budget: number;
          role: UserRoles;
        };
    }
}
interface LoginFuncResponse {
        accessToken: string;
        refreshToken: string;
        user: {
          email: string;
          _id: string;
          firstname: string;
          lastname: string;
          avatar: string;
          budget: number;
          role: UserRoles;
        };
}

export const loginUser = async (email: string, password: string): Promise<LoginFuncResponse> => {
  const response = await axios.post<LoginResponse>('http://localhost:8000/api/v1/users/login', { email, password });
  const {data} = response.data;
  const { accessToken, refreshToken, user } = data;
  return ({refreshToken, accessToken , user });
};

export const logoutUser = async () => {
  try {
    await axiosInstance.post('/users/logout', 
    {},
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred during logout.'
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
}

interface SignUpData {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  budget: number;
  avatar: File | null;
}

interface SignUpResponse {
  success: boolean;
  message: string;
  user?: {
    email: string;
    firstname: string;
    lastname: string;
    avatar: string;
    budget: number;
  };
}

export const signUp = async (data: SignUpData): Promise<SignUpResponse> => {
  const formData = new FormData();

  formData.append('email', data.email);
  formData.append('firstname', data.firstname);
  formData.append('lastname', data.lastname);
  formData.append('password', data.password);
  formData.append('budget', data.budget.toString());
  if (data.avatar) {
    formData.append('avatar', data.avatar);
  }

  try {
    const response = await axios.post<SignUpResponse>(
      'http://localhost:8000/api/v1/users/register', // Replace with your API endpoint
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred during sign-up.'
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};