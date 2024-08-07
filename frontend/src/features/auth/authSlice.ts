// src/redux/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

enum UserRoles {
  admin = 'admin',
  user = 'user',
}

interface User {
  email: string;
  _id: string;
  firstname: string;
  lastname: string;
  avatar: string;
  budget: number;
  role: UserRoles;
}

interface AuthState {
  isAuthenticated?: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  refreshToken: '',
  accessToken: '',
  user: {
    email: '',
    _id: '',
    firstname: '',
    lastname: '',
    avatar: '',
    budget: 0,
    role: UserRoles.user,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ refreshToken: string , accessToken: string; user: User }>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.refreshToken = '';
      state.user = {
        email: '',
        _id: '',
        firstname: '',
        lastname: '',
        avatar: '',
        budget: 0,
        role: UserRoles.user,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
