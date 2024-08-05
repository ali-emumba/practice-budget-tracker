import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

enum userRoles {"admin", "user"};

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string;
    user: {
        email: string;
        _id: string;
        firstname: string;
        lastname: string;
        avatar: string;
        budget: number;
        role: userRoles;
    }
}

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: "",
    user: {
        email: "",
        _id: "",
        firstname: "",
        lastname: "",
        avatar: "",
        budget: 0,
        role: userRoles.user
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = "";
            state.user = {
                email: "",
                _id: "",
                firstname: "",
                lastname: "",
                avatar: "",
                budget: 0,
                role: userRoles.user
            }
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;