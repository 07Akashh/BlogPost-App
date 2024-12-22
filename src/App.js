import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Layout from './components/home/Layout';
import BlogPostDetail from './pages/blog/BlogPostDetail';
import BlogPage from './pages/blog/BlogPostPage';
import UserProfile from './pages/user/UserProfile';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import UserList from './components/user/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from './redux/slices/authSlice';

const App = () => {
    const dispatch = useDispatch()
    const { token, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token && !user) {
            dispatch(fetchProfile());
        }
    });

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<PublicRoute> <Register key={Date.now()} /> </PublicRoute>} />
                <Route path="/login" element={<PublicRoute> <Login key={Date.now()} /> </PublicRoute>} />
                <Route path="/" element={<Layout />}>
                    <Route path="/post/:id" element={<PrivateRoute> <BlogPostDetail /> </PrivateRoute>} />
                    <Route path="/" element={<BlogPage />} />
                    <Route path="/user" element={<PrivateRoute> <UserList /> </PrivateRoute>} />
                    <Route path="/user/:userId" element={<PrivateRoute> <UserProfile /> </PrivateRoute>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
