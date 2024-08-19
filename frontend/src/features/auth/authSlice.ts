import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface User {
  email: string;
  _id: string;
  firstname: string;
  lastname: string;
  avatar: string;
  budget: number;
  role: string;
  jobTitle?: string;
  phone?: string;
  locationCity?: string;
  website?: string;
  aboutMe?: string;
  fatherName?: string;
  gender?: string;
  zipcode?: string;
  education?: string;
  dob?: string;
  address?: string;
  fullName?: string;
  streetAddress?: string;
  state?: string;
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
  console.log(state);
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
    role: '',
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
        role: '',
      };
      // Remove the state from localStorage
      localStorage.removeItem('authState');
    },
    setUserState: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      const authState = JSON.parse(localStorage.getItem('authState')!);
      authState.user = action.payload;
      localStorage.setItem('authState', JSON.stringify(authState));
    }
  },
});

export const { login, logout, setUserState } = authSlice.actions;

export default authSlice.reducer;
