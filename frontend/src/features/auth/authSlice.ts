import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// Function to load state from localStorage
const loadStateFromLocalStorage = (): AuthState | undefined => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage', err);
    return undefined;
  }
};

// Function to save state to localStorage
const saveStateToLocalStorage = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

// Initial state with localStorage check
const persistedState = loadStateFromLocalStorage();
const initialState: AuthState = persistedState || {
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
    login: (state, action: PayloadAction<{ refreshToken: string; accessToken: string; user: User }>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      // Save the updated state to localStorage
      saveStateToLocalStorage(state);
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
      // Remove the state from localStorage
      localStorage.removeItem('authState');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
