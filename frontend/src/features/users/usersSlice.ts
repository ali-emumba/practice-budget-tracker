import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
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

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]> ) => {
            console.log("action payload", action.payload);
            state.users = action.payload
        },
        addUser: (state, action: PayloadAction<User>) => {
            console.log(action.payload)
            state.users.push(action.payload);
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user._id !== action.payload);
        },
        editUser: (state, action: PayloadAction<User>) => {
            state.users = state.users.map(user => {
                if (user._id === action.payload._id) {
                    return action.payload;
                }
                return user;
            });
        },
    },
})

export const { addUser, deleteUser, editUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;