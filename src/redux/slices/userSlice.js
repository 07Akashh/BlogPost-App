import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../services/UserService';


export const updateProfile = createAsyncThunk('user/updateProfile', async (formData, thunkAPI) => {
    try {
        return await UserService.updateProfile(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async (_, thunkAPI) => {
    try {
        return await UserService.getAllUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId, thunkAPI) => {
    try {
        return await UserService.getUserById(userId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        users: [],
        selectedUser: null,
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = { ...state.profile, ...action.payload };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchUserById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
