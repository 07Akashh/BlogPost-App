import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import blogPostReducer from './slices/blogPostSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        blogPost: blogPostReducer,
    },
});

export default store;