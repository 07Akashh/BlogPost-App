import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Dashboard from './components/Dashboard';
import BlogPostDetail from './components/post/BlogPost';
import BlogPage from './components/post/BlogPostModal';
import UserProfile from './components/profile/UserProfile';
import { AuthProvider } from './components/routes/AuthProvider';
import PrivateRoute from './components/routes/PrivateRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/post/:id" element={<PrivateRoute><BlogPostDetail /></PrivateRoute>} />
                    <Route path="/posts" element={<PrivateRoute><BlogPage /></PrivateRoute>} />
                    <Route path="/user/:userId" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;