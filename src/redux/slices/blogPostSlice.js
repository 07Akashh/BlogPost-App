import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getPostsByAuthor,
    getComments,
    getBlogPostById,
    createPost,
    getUserPosts,
    deletePost
} from '../services/BlogPostService';

export const fetchPostsByAuthor = createAsyncThunk('blogPosts/fetchPostsByAuthor', async (authorId, { rejectWithValue }) => {
    try {
        return await getPostsByAuthor(authorId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchUserPosts = createAsyncThunk('blogPosts/fetchUserPosts', async (_, { rejectWithValue }) => {
    try {
        return await getUserPosts();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const fetchComments = createAsyncThunk('blogPosts/fetchComments', async (postId, { rejectWithValue }) => {
    try {
        return await getComments(postId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchBlogPostById = createAsyncThunk('blogPosts/fetchBlogPostById', async (postId, { rejectWithValue }) => {
    try {
        return await getBlogPostById(postId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createNewPost = createAsyncThunk('blogPosts/createNewPost', async (formData, { rejectWithValue }) => {
    try {
        return await createPost(formData);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const removePost = createAsyncThunk('blogPosts/removePost', async (postId, { rejectWithValue }) => {
    try {
        return await deletePost(postId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const postSlice = createSlice({
    name: 'blogPosts',
    initialState: {
        posts: [],
        comments: [],
        postDetails: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsByAuthor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostsByAuthor.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPostsByAuthor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBlogPostById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogPostById.fulfilled, (state, action) => {
                state.loading = false;
                state.postDetails = action.payload;
            })
            .addCase(fetchBlogPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createNewPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removePost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.filter(post => post.id !== action.payload.id);
            })
            .addCase(removePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default postSlice.reducer;
