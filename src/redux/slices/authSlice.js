import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await AuthService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await AuthService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, thunkAPI) => {
    try {
        return await UserService.getProfile();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: AuthService.getCurrentUser() || null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            AuthService.logout();
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;